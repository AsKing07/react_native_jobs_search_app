import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CountryPicker from "rn-country-dropdown-picker";
import { useGlobalState } from "../../utils/GlobalState";
import { SIZES } from "../../constants";
import styles from "../../styles/search";

const getRemoteJobsLabel = (value) => (value ? "Oui" : "Non");

const getEmploymentTypeLabel = (value) => {
  // Recherche l'option correspondante dans employmentTypesOptions
  const option = employmentTypesOptions.find((option) => option.value === value);
  return option ? option.label : "";
};

const getJobRequirementsLabel = (value) => {
  // Recherche l'option correspondante dans jobRequirementsOptions
  const option = jobRequirementsOptions.find((option) => option.value === value);
  return option ? option.label : "";
};



  // Options pour les types d'emploi
  const employmentTypesOptions = [
    { label: "Plein temps", value: "FULLTIME" },
    { label: "Contrat", value: "CONTRACTOR" },
    { label: "Temps partiel", value: "PARTTIME" },
    { label: "Stage", value: "INTERN" },
  ];

  // Options pour les exigences d'emploi
  const jobRequirementsOptions = [
    { label: "Moins de 3 ans d'expérience", value: "under_3_years_experience" },
    { label: "Plus de 3 ans d'expérience", value: "more_than_3_years_experience" },
    { label: "Pas d'expérience", value: "no_experience" },
    { label: "Pas de diplôme", value: "no_degree" },
  ];

  //Options pour le pays
  // const countries = globalState.countries;



const JobFilters = ({ filters, setFilters, handleSearch }) => {
  // États pour gérer l'affichage des listes déroulantes
  const [showRemoteJobsDropdown, setShowRemoteJobsDropdown] = useState(false);
  const [showEmploymentTypesDropdown, setShowEmploymentTypesDropdown] = useState(false);
  const [showJobRequirementsDropdown, setShowJobRequirementsDropdown] = useState(false);
  const [showJobCountryDropdown, setShowJobCountryDropdown] = useState(false);
  const { globalState } = useGlobalState();

  return (
    <SafeAreaView>
      {/* View horizontale pour les filtres */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal contentContainerStyle={{ columnGap: SIZES.small }}>
          {/* Filtre pour emploi à distance */}
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setShowRemoteJobsDropdown(!showRemoteJobsDropdown)}
            numberofLihe
          >
            <Text style={styles.tabLabel}>Emploi à distance</Text>
            <Text style={styles.tabText}>{filters.remote_jobs_only.label}</Text>
          </TouchableOpacity>

          {/* Filtre pour types d'emploi */}
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setShowEmploymentTypesDropdown(!showEmploymentTypesDropdown)}
          >
            <Text style={styles.tabLabel}>Types d'emploi</Text>
            <Text style={styles.tabText}>{filters.employment_types.label}</Text>
          </TouchableOpacity>

          {/* Filtre pour exigences d'emploi */}
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setShowJobRequirementsDropdown(!showJobRequirementsDropdown)}
          >
            <Text style={styles.tabLabel}>Exigences d'emploi</Text>
            <Text style={styles.tabText}>{filters.job_requirements.label}</Text>
          </TouchableOpacity>

          {/* Filtre pour le pays */}
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setShowJobCountryDropdown(!showJobCountryDropdown)}
          >
            <Text style={styles.tabLabel}>Pays</Text>
            <Text style={styles.tabText}>{filters.countryName.label}</Text>
          </TouchableOpacity>
        </ScrollView>

        <View>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modales pour les listes déroulantes */}
      <Modal visible={showRemoteJobsDropdown} transparent={true} animationType="slide">
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>Emploi à distance</Text>
          <Picker
            selectedValue={filters.remote_jobs_only.value}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                remote_jobs_only: {
                  value: value,
                  label: getRemoteJobsLabel(value), // Obtenir le libellé correspondant
                },
              })
            }
          >
            <Picker.Item label="Non" value={false} />
            <Picker.Item label="Oui" value={true} />
          </Picker>
          <TouchableOpacity
            style={styles.dropdownCloseButton}
            onPress={() => setShowRemoteJobsDropdown(false)}
          >
            <Text style={styles.dropdownCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showEmploymentTypesDropdown} transparent={true} animationType="slide">
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>Types d'emploi</Text>
          <Picker
            selectedValue={filters.employment_types.value}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                employment_types: {
                  value: value,
                  label: getEmploymentTypeLabel(value), // Obtenir le libellé correspondant
                },
              })
            }
            mode="dropdown"
          >
            {employmentTypesOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.dropdownCloseButton}
            onPress={() => setShowEmploymentTypesDropdown(false)}
          >
            <Text style={styles.dropdownCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showJobRequirementsDropdown} transparent={true} animationType="slide">
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>Exigences d'emploi</Text>
          <Picker
            selectedValue={filters.job_requirements.value}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                job_requirements: {
                  value: value,
                  label: getJobRequirementsLabel(value), // Obtenir le libellé correspondant
                },
              })
            }
            mode="dialog"
          >
            {jobRequirementsOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.dropdownCloseButton}
            onPress={() => setShowJobRequirementsDropdown(false)}
          >
            <Text style={styles.dropdownCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showJobCountryDropdown} transparent={true} animationType="slide">
        <View style={styles.modalCountry} visible={showJobCountryDropdown}>
          <CountryPicker
            Placeholder="Rechercher un pays ..."
            InputFieldStyle={styles.InputStyle}
            selectedItem={(value) => {
              setFilters({
                ...filters,
                countryName: {
                  value: value.country,
                  label: value.country, // Obtenir le libellé correspondant
                },
              });
              setShowJobCountryDropdown(false);
            }}
          />
          <TouchableOpacity
            style={styles.dropdownCloseButton}
            onPress={() => setShowJobCountryDropdown(false)}
          >
            <Text style={styles.dropdownCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default JobFilters;
