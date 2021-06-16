import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import firebase from "firebase";

import { COLORS, SIZES, FONTS, icons } from "../constants";

const HistoriqueEntreesSorties = ({
  navigation,
  customContainerStyle,
  number,
  periodeFiltre,
  personneFiltre,
  typeFiltre,
  nbRefresh,
}) => {
  const [historiqueEntreesSorties, setHistoriqueEntreesSorties] = useState();
  const [
    historiquePremieresEntreesSorties,
    setHistoriquePremieresEntreesSorties,
  ] = useState();

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
          "Erreur en récupérant le document (HistoriqueEntreesSorties.js > useEffect() > articles) : ",
          error
        );
      });

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
          "Erreur en récupérant le document (HistoriqueEntreesSorties.js > useEffect() > utilisateurs) : ",
          error
        );
      });

    // Historiques
    var historique = [];
    var historiqueEntier = [];
    var historiqueDernieresLignes = [];
    db.collection("historique")
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

          historique.push({
            id: doc.id,
            idArticle: doc.data().idArticle,
            nomArticle: tousLesArticles.filter(
              (article) => article.id === doc.data().idArticle
            )[0].nom,
            nombre: doc.data().nombre,
            idUtilisateur: doc.data().idUtilisateur,
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

        // trier l'historique par ordre de date
        historiqueEntier = historique.sort((a, b) => b.date - a.date);
        historiqueDernieresLignes = historiqueEntier.slice(0, 6);

        // Trier l'historique suivant le filtre Type
        if (typeFiltre.nom === "Entrées") {
          historiqueEntier = historiqueEntier.filter(
            (ligne) => ligne.type === "E"
          );
        } else if (typeFiltre.nom === "Sorties") {
          historiqueEntier = historiqueEntier.filter(
            (ligne) => ligne.type === "S"
          );
        }

        // Trier l'historique suivant le filtre Personne
        if (personneFiltre.id !== "0") {
          historiqueEntier = historiqueEntier.filter(
            (ligne) => ligne.idUtilisateur === personneFiltre.id
          );
        }

        // Trier l'historique suivant le filtre Période
        var maintenant = new Date();
        if (periodeFiltre.id === 2) {
          historiqueEntier = historiqueEntier.filter(
            (ligne) =>
              ligne.date.getMonth() === maintenant.getMonth() &&
              ligne.date.getFullYear() === maintenant.getFullYear()
          );
        } else if (periodeFiltre.id === 3) {
          historiqueEntier = historiqueEntier.filter(
            (ligne) => ligne.date.getTime() > maintenant.getTime() - 604800000
          );
        } else if (periodeFiltre.id === 4) {
          historiqueEntier = historiqueEntier.filter(
            (ligne) =>
              ligne.date.getDate() === maintenant.getDate() &&
              ligne.date.getMonth() === maintenant.getMonth() &&
              ligne.date.getFullYear() === maintenant.getFullYear()
          );
        }

        setHistoriqueEntreesSorties(historiqueEntier);
        setHistoriquePremieresEntreesSorties(historiqueDernieresLignes);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Recap.js > useEffect() > historiques) : ",
          error
        );
      });
  }, [nbRefresh]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.base,
        }}
        onPress={() =>
          navigation.navigate("FicheArticle", { idArticle: item.idArticle })
        }
      >
        <Image
          source={icons.entree_sortie}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.primary,
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3 }}>{item.nomArticle}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
            {item.dateString} - {item.nomUtilisateur}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: item.type === "E" ? COLORS.green : COLORS.red,
              fontWeight: "bold",
              ...FONTS.body4,
            }}
          >
            {item.type === "E" ? "+" : "-"} {item.nombre}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}
    >
      <Text
        style={{ ...FONTS.h2, fontWeight: "bold", marginBottom: SIZES.base }}
      >
        Historique des entrées/sorties
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.radius }}
          scrollEnabled={false}
          data={
            number === 5
              ? historiquePremieresEntreesSorties
              : historiqueEntreesSorties
          }
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: COLORS.lightGray,
                }}
              />
            );
          }}
        />
      </ScrollView>

      {number === 5 && (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Historique")}
        >
          <Image
            source={icons.troisPetitsPoints}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.lightGray,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HistoriqueEntreesSorties;
