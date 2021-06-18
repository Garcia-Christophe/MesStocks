// Historique > Filtres Type et Période
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

// Rechercher > Filtre Type
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

// Fiche article > Parents
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

// Params > Thèmes et notifications
export const themes = [
  {
    id: 0,
    nom: "Clair",
  },
  {
    id: 1,
    nom: "Sombre",
  },
];

export const notifications = [
  {
    id: 0,
    nom: "Activées",
  },
  {
    id: 1,
    nom: "Désactivées",
  },
];

// Export
const dummyData = {
  types,
  periodes,
  typesFiltresRecherche,
  categoriesParentsArticle,
  sousCategoriesParentsArticle,
  marquesParentsArticle,
  themes,
  notifications,
};

export default dummyData;
