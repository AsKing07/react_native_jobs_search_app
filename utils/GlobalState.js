import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocales } from 'expo-localization';
import i18nIsoCountries from "i18n-iso-countries";

i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    country: "",
    language: "",
    countryName: "",
    countries:[]
  });

  useEffect(() => {
    const country = getLocales()[0].regionCode;
    const language = getLocales()[0].languageCode;
    const countryName = i18nIsoCountries.getName(country, language);
    const countriesObject = i18nIsoCountries.getNames("fr", {select: "official"})

    const countries = Object.values(countriesObject)

    setGlobalState({
      country:country,
      language:language,
      countryName:countryName,
      countries: countries
    });
  }, []); // Utilisez useEffect pour obtenir les informations au montage du composant

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState doit être utilisé dans un GlobalStateProvider");
  }
  return context;
};
