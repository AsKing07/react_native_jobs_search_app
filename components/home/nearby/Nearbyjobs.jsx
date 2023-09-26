import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import { getLocales } from 'expo-localization';
import i18nIsoCountries from "i18n-iso-countries";


import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";

i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const country=getLocales()[0].regionCode;
const langue=getLocales()[0].languageCode
const countryName = i18nIsoCountries.getName(country,langue)

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: `  ${countryName}`,
    num_pages: "1",
    country: `${country}`, 
    language:`${langue}`
  });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Près de chez vous</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Voir Tout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>oups, quelque chose s'est mal passé!</Text>
        ) : (
          data?.map((job)=>(
            <NearbyJobCard 
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;