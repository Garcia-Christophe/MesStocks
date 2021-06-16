import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import firebase from "firebase";

import { BarreRetour } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const DerniersEvenements = ({ navigation }) => {
  const [nbRefresh, setNbRefresh] = useState(0); // Incrémenté de 1 pour forcer le useEffect (re-render)

  const [derniersEvenements, setDerniersEvenements] = useState([]);

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

    var db = firebase.firestore();

    // Utilisateurs
    var tousLesUtilisateurs = [];
    db.collection("utilisateurs")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tousLesUtilisateurs.push({
            id: doc.id,
            nom: doc.data().nom,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (DerniersEvenements.js > useEffect() > utilisateurs) : ",
          error
        );
      });

    // Articles
    var tousLesArticles = [];
    db.collection("articles")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tousLesArticles.push({
            id: doc.id,
            nom: doc.data().nom,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (DerniersEvenements.js > useEffect() > articles) : ",
          error
        );
      });

    // Catégories
    var toutesLesCategories = [];
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          toutesLesCategories.push({
            id: doc.id,
            nom: doc.data().nom,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (DerniersEvenements.js > useEffect() > categories) : ",
          error
        );
      });

    // Sous-catégories
    var toutesLesSousCategories = [];
    db.collection("sousCategories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          toutesLesSousCategories.push({
            id: doc.id,
            nom: doc.data().nom,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (DerniersEvenements.js > useEffect() > sousCategories) : ",
          error
        );
      });

    // Marques
    var toutesLesMarques = [];
    db.collection("marques")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          toutesLesMarques.push({
            id: doc.id,
            nom: doc.data().nom,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (DerniersEvenements.js > useEffect() > marques) : ",
          error
        );
      });

    // Derniers évènements
    var evenements = [];
    db.collection("derniersEvenements")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var date = doc.data().date.split(" ");
          var anneeMoisJour = date[0].split("/");
          var heureMinute = date[1].split(":");
          var jour = anneeMoisJour[0];
          var mois = anneeMoisJour[1];
          var annee = anneeMoisJour[2];
          var heure = heureMinute[0];
          var minute = heureMinute[1];

          evenements.push({
            id: doc.id,
            // filtre in tousLesArticles ou toutesLesCategories ou toutesLesSousCategories ou toutesLesMarques suivant doc.data().objet
            nomObjet:
              doc.data().objet === "U"
                ? tousLesUtilisateurs.filter(
                    (utilisateur) => utilisateur.id === doc.data().idObjet
                  )[0].nom
                : doc.data().objet === "A"
                ? tousLesArticles.filter(
                    (article) => article.id === doc.data().idObjet
                  )[0].nom
                : doc.data().objet === "C"
                ? toutesLesCategories.filter(
                    (categorie) => categorie.id === doc.data().idObjet
                  )[0].nom
                : doc.data().objet === "SC"
                ? toutesLesSousCategories.filter(
                    (sousCategorie) => sousCategorie.id === doc.data().idObjet
                  )[0].nom
                : doc.data().objet === "M"
                ? toutesLesMarques.filter(
                    (marque) => marque.id === doc.data().idObjet
                  )[0].nom
                : "",
            objet: doc.data().objet,
            nomUtilisateur: tousLesUtilisateurs.filter(
              (utilisateur) => utilisateur.id === doc.data().idUtilisateur
            )[0].nom,
            type: doc.data().type,
            date: new Date(
              parseInt(annee),
              parseInt(mois) - 1,
              parseInt(jour),
              parseInt(heure),
              parseInt(minute)
            ),
            dateString: doc.data().date,
          });
        });

        // Trier l'historique par ordre de date
        evenements = evenements.sort((a, b) => b.date - a.date);

        setDerniersEvenements(evenements);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Recap.js > useEffect() > derniersEvenements) : ",
          error
        );
      });
  }, [nbRefresh]);

  function renderEvenement({
    icon,
    iconColor,
    nomObjet,
    description,
    personne,
    date,
  }) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: SIZES.base,
          marginHorizontal: SIZES.padding / 2,
          paddingVertical: SIZES.padding / 2,
          paddingHorizontal: SIZES.padding / 2,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
        }}
      >
        <Image
          source={icon}
          style={{
            width: 25,
            height: 25,
            tintColor: iconColor,
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>{nomObjet}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>
            {description} par {personne}
            {"\n" + date}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ height: "100%" }}>
      <View style={{ width: "100%", height: 130 }}>
        <ImageBackground
          source={images.banniere}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <BarreRetour right={false} color={COLORS.white} />

          <Text
            style={{
              marginVertical: SIZES.base,
              ...FONTS.h2,
              color: COLORS.white,
            }}
          >
            Derniers évènements
          </Text>
        </ImageBackground>
      </View>

      <ScrollView>
        <View style={{ flex: 1 }}>
          {derniersEvenements.map((evenement) =>
            renderEvenement({
              idArticle: 1,
              icon:
                evenement.type === "A"
                  ? icons.ajouter
                  : evenement.type === "M"
                  ? icons.modifier
                  : icons.suppression,
              iconColor:
                evenement.type === "A"
                  ? COLORS.green
                  : evenement.type === "M"
                  ? COLORS.yellow
                  : COLORS.red,
              nomObjet: evenement.nomObjet,
              description:
                evenement.objet === "U" && evenement.type === "A"
                  ? "Utilisateur ajouté"
                  : evenement.objet === "U" && evenement.type === "M"
                  ? "Utilisateur modifié"
                  : evenement.objet === "U" && evenement.type === "S"
                  ? "Utilisateur supprimé"
                  : evenement.objet === "A" && evenement.type === "A"
                  ? "Article ajouté"
                  : evenement.objet === "A" && evenement.type === "M"
                  ? "Article modifié"
                  : evenement.objet === "A" && evenement.type === "S"
                  ? "Article supprimé"
                  : evenement.objet === "C" && evenement.type === "A"
                  ? "Catégorie ajoutée"
                  : evenement.objet === "C" && evenement.type === "M"
                  ? "Catégorie modifiée"
                  : evenement.objet === "C" && evenement.type === "S"
                  ? "Catégorie supprimée"
                  : evenement.objet === "SC" && evenement.type === "A"
                  ? "Sous-catégorie ajoutée"
                  : evenement.objet === "SC" && evenement.type === "M"
                  ? "Sous-catégorie modifiée"
                  : evenement.objet === "SC" && evenement.type === "S"
                  ? "Sous-catégorie supprimée"
                  : evenement.objet === "M" && evenement.type === "A"
                  ? "Marque ajoutée"
                  : evenement.objet === "M" && evenement.type === "M"
                  ? "Marque modifiée"
                  : evenement.objet === "M" && evenement.type === "S"
                  ? "Marque supprimée"
                  : "",
              personne: evenement.nomUtilisateur,
              date: evenement.dateString,
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default DerniersEvenements;
