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
  themes,
  notifications,
};

export default dummyData;
