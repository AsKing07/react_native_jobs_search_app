import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    searchTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
    },
    noOfSearchedJobs: {
        marginTop: 2,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    loaderContainer: {
        marginTop: SIZES.medium
    },
    footerContainer: {
        marginTop: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    paginationButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary
    },
    paginationImage: {
        width: '60%',
        height: '60%',
        tintColor: COLORS.white
    },
    paginationTextBox: {
        width: 30,
        height: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    paginationText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary
    },


  
   // Styles pour les onglets de filtre
   tabsContainer: {
    width:"100%",
    marginTop: SIZES.medium,
    // flexDirection: 'row',
    // backgroundColor: COLORS.lightWhite,
    // paddingVertical: SIZES.small,
  },
  tab: {
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small/2,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: 'gray', // Bordure grise
  },
  tabLabel: {
    fontSize: SIZES.body3,
    color: 'rgba(128, 128, 128, 0.8)', // Texte gris avec légère transparence
  },
  tabText: {
    fontFamily: FONT.medium,
    fontWeight: 'bold',
  },

  // Styles pour les modales
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond légèrement opaque
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent pour le flou
    justifyContent: "center", // Centre les éléments verticalement
    paddingHorizontal: 20, // Espacement horizontal
    borderRadius: 10, // Coins arrondis
    backgroundColor: 'white',
    height: '50%',
    margin: 20, // Espacement autour du modal
  },
  
  
  dropdownTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.medium,
  },
  dropdownCloseButton: {
    marginTop: SIZES.small,
    alignSelf: 'flex-end',
  },
  dropdownCloseButtonText: {
    color: 'rgba(128, 128, 128, 0.8)', // Texte gris avec légère transparence
  },

  button: {
    width: "100%",
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.tertiary, // Ajout d'une couleur de bordure
    backgroundColor: COLORS.tertiary, // Utilisation d'une autre couleur de fond
    alignItems: "center", // Centrage du contenu horizontalement
    justifyContent: "center", // Centrage du contenu verticalement
    marginTop: SIZES.medium,
  },
  
  buttonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.body2, // Ajout d'une taille de police
    color: COLORS.lightWhite,
  },





  InputStyle:{
   
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent pour le flou
    marginTop: "20%"

    
    //margin: 20, // Espacement autour du moda
    
  },
  modalCountry:
  {
    height: '100%',
    backgroundColor: "white", // Fond semi-transparent pour le flou

  }


  

  



});

export default styles;
