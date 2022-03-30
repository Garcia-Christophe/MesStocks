import React, { useEffect } from "react";
import firebase from "firebase";

import MainStackNavigator from "./navigation/MainStackNavigator";

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      // Configuration de la Firebase
      var firebaseConfig = {
        apiKey: "AIzaSyBfRGYAMrZnSYhkQN-YeZa1kcTq71_H5xQ",
        authDomain: "messtocks-17fee.firebaseapp.com",
        projectId: "messtocks-17fee",
        storageBucket: "messtocks-17fee.appspot.com",
        messagingSenderId: "772139915219",
        appId: "1:772139915219:web:3d6720ecd5ed424b648126",
        measurementId: "G-91GK8TDNTB",
      };

      // Initialise Firebase
      firebase.initializeApp(firebaseConfig);
    }

    // var db = firebase.firestore();

    // // Catégories
    // var toutesLesCategories = [];
    // db.collection("categories")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       toutesLesCategories.push({
    //         id: doc.id,
    //         nom: doc.data().nom,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > categories) : ",
    //       error
    //     );
    //   });

    // // Sous-catégories
    // var toutesLesSousCategories = [];
    // db.collection("sousCategories")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       toutesLesSousCategories.push({
    //         id: doc.id,
    //         nom: doc.data().nom,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > sousCategories) : ",
    //       error
    //     );
    //   });

    // // Marques
    // var toutesLesMarques = [];
    // toutesLesMarques.push({
    //   id: 0,
    //   nom: "Toutes",
    // });
    // db.collection("marques")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       toutesLesMarques.push({
    //         id: doc.id,
    //         nom: doc.data().nom,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > marques) : ",
    //       error
    //     );
    //   });

    // // Articles
    // var tousLesArticles = [];
    // db.collection("articles")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       tousLesArticles.push({
    //         id: doc.id,
    //         nom: doc.data().nom,
    //         idCategorie: doc.data().idCategorie,
    //         idSousCategorie: doc.data().idSousCategorie,
    //         idMarque: doc.data().idMarque,
    //         stocks: doc.data().stocks,
    //         stocksMini: doc.data().stocksMini,
    //         entrees: doc.data().entrees,
    //         sorties: doc.data().sorties,
    //         entreesSorties: doc.data().entreesSorties,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > articles) : ",
    //       error
    //     );
    //   });

    // // Derniers évènements
    // var tousLesDerniersEvenements = [];
    // db.collection("derniersEvenements")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       tousLesDerniersEvenements.push({
    //         id: doc.id,
    //         date: doc.data().date,
    //         nomObjet: doc.data().nomObjet,
    //         objet: doc.data().objet,
    //         type: doc.data().type,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > derniersEvenements) : ",
    //       error
    //     );
    //   });

    // // Historique
    // var toutHistorique = [];
    // db.collection("historique")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       toutHistorique.push({
    //         id: doc.id,
    //         date: doc.data().date,
    //         idArticle: doc.data().idArticle,
    //         idUtilisateur: doc.data().idUtilisateur,
    //         type: doc.data().type,
    //         nombre: doc.data().nombre,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > historique) : ",
    //       error
    //     );
    //   });

    // // Parametres
    // var tousLesParametres = [];
    // db.collection("parametres")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       tousLesParametres.push({
    //         id: doc.id,
    //         notifACommander: doc.data().notifACommander,
    //         notifCreations: doc.data().notifCreations,
    //         notifModifications: doc.data().notifModifications,
    //         notifSuppressions: doc.data().notifSuppressions,
    //         notifEntreesSorties: doc.data().notifEntreesSorties,
    //         theme: doc.data().theme,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > parametres) : ",
    //       error
    //     );
    //   });

    // // Utilisateurs
    // var tousLesUtilisateurs = [];
    // db.collection("utilisateurs")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       tousLesUtilisateurs.push({
    //         id: doc.id,
    //         nom: doc.data().nom,
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(
    //       "Erreur en récupérant le document (App.js > useEffect() > utilisateurs) : ",
    //       error
    //     );
    //   });
  }, []);

  return <MainStackNavigator />;
};

export default App;
