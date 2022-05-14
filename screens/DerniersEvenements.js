import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground } from "react-native";
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

    // Derniers évènements
    var evenements = [];
    db.collection("derniersEvenements")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var date = doc.data().date.split(" ");
          var anneeMoisJour = date[0].split("/");
          var heureMinuteSeconde = date[1].split(":");
          var jour = anneeMoisJour[0];
          var mois = anneeMoisJour[1];
          var annee = anneeMoisJour[2];
          var heure = heureMinuteSeconde[0];
          var minute = heureMinuteSeconde[1];
          var seconde = heureMinuteSeconde[2];

          evenements.push({
            id: doc.id,
            nomObjet: doc.data().nomObjet,
            objet: doc.data().objet,
            type: doc.data().type,
            date: new Date(
              parseInt(annee),
              parseInt(mois) - 1,
              parseInt(jour),
              parseInt(heure),
              parseInt(minute),
              parseInt(seconde)
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
          "Erreur en récupérant le document (DerniersEvenements.js > useEffect() > derniersEvenements) : ",
          error
        );
      });
  }, [nbRefresh]);

  function renderEvenement({
    key,
    icon,
    iconColor,
    nomObjet,
    description,
    date,
  }) {
    return (
      <View
        key={key}
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
            {description}
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
              key: evenement.id,
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
              date: evenement.dateString,
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DerniersEvenements;
