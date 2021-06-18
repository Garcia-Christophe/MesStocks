// Historique
export const historiquePremieresEntreesSorties = [];

export const historiqueEntreesSorties = [];

// Filtres historique
export const types = [
  {
    id: 1,
    nom: "Tous",
  },
  {
    id: 2,
    nom: "Entrées",
  },
  {
    id: 3,
    nom: "Sorties",
  },
];

export const personnes = [];

export const periodes = [
  {
    id: 1,
    nom: "Toutes",
  },
  {
    id: 2,
    nom: "Mois",
  },
  {
    id: 3,
    nom: "Semaine",
  },
  {
    id: 4,
    nom: "Aujourd'hui",
  },
];

// Filtres recherche
export const typesFiltresRecherche = [
  {
    id: 0,
    nom: "Tous",
  },
  {
    id: 1,
    nom: "À commander",
  },
  {
    id: 2,
    nom: "Stocks à jour",
  },
];

export const categoriesFiltresRecherche = [];

export const sousCategoriesFiltresRecherche = [];

export const marquesFiltresRecherche = [];

// Parents fiche article
export const categoriesParentsArticle = [
  {
    id: 1,
    nom: "Aucune",
  },
  {
    id: 2,
    nom: "Éclairage",
  },
  {
    id: 3,
    nom: "Appareillage",
  },
];

export const sousCategoriesParentsArticle = [
  {
    id: 1,
    nom: "Aucune",
  },
  {
    id: 2,
    nom: "Ampoules",
  },
  {
    id: 3,
    nom: "Appliques",
  },
  {
    id: 4,
    nom: "Plafonniers",
  },
  {
    id: 5,
    nom: "Hublots",
  },
  {
    id: 6,
    nom: "Boite de dérivation / Coffret",
  },
  {
    id: 7,
    nom: "Détecteurs de mouvementations",
  },
];

export const marquesParentsArticle = [
  {
    id: 1,
    nom: "Aucune",
  },
  {
    id: 2,
    nom: "Robus",
  },
  {
    id: 3,
    nom: "Philips",
  },
  {
    id: 4,
    nom: "Decoute",
  },
  {
    id: 5,
    nom: "Legrand",
  },
  {
    id: 6,
    nom: "Limaro",
  },
];

// Paramètres
export const themes = [
  {
    id: 1,
    nom: "Clair",
  },
  {
    id: 2,
    nom: "Sombre",
  },
];

export const notifications = [
  {
    id: 1,
    nom: "Activées",
  },
  {
    id: 2,
    nom: "Désactivées",
  },
];

// Objets
export const articles = [];

export const categories = [];

export const sousCategories = [];

export const marques = [];

export const utilisateurs = [];

// Export
const dummyData = {
  sousCategories,
  historiquePremieresEntreesSorties,
  historiqueEntreesSorties,
  types,
  personnes,
  periodes,
  articles,
  categories,
  sousCategories,
  marques,
  utilisateurs,
  typesFiltresRecherche,
  categoriesFiltresRecherche,
  sousCategoriesFiltresRecherche,
  marquesFiltresRecherche,
  categoriesParentsArticle,
  sousCategoriesParentsArticle,
  marquesParentsArticle,
  themes,
  notifications,
};

export default dummyData;
