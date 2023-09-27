// JobSearch.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text, SafeAreaView } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import axios from "axios";
import { useGlobalState } from "../../utils/GlobalState";
import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import JobFilters from "../../components/search/searchfilter";

const JobSearch = () => {
  const { globalState } = useGlobalState();
  const params = useSearchParams();
  const router = useRouter();

  // État pour stocker les filtres de recherche
  const [filters, setFilters] = useState({
    remote_jobs_only: {
      value: false,
      label: " ",
    },
    employment_types: {
      value: " ",
      label: " ",
    },
    job_requirements: {
      value: " ",
      label: " ",
    },
    language: globalState.language,
    countryName: {
      value:" ",
      label: " ",
    },
  });

  // États pour gérer les résultats de la recherche
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  // Fonction pour effectuer une recherche d'emploi
  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);
    try {
      const options = {
        method: "GET",
        url:  `https://jsearch.p.rapidapi.com/search` ,
        headers: {
          "X-RapidAPI-Key": "",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        
        params: {
          query:  `${params.id}, ${filters.countryName.value}` ,
          page: page.toString(),
          language: filters.language,
          remote_jobs_only: filters.remote_jobs_only.value,
          employment_types: filters.employment_types.value,
          job_requirements: filters.job_requirements.value,
        },
      };
      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  // Fonction pour gérer la pagination des résultats
  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };

  // Effet pour déclencher la recherche au chargement de la page
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Écran de recherche d'emploi */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "Résultat de la recherche",
        }}
      />

      <JobFilters
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
      />

      {/* Gestion de l'affichage des résultats */}
      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push( `/job-details/${item.job_id}` )}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>
                Opportunités de Travail 💼
              </Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops, une erreur s'est produite 😪</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
