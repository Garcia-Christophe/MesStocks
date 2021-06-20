import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  LogBox,
} from "react-native";
import firebase from "firebase";

import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { HistoriqueEntreesSorties } from "../components";

const Recap = ({ navigation }) => {
  const [nbRefresh, setNbRefresh] = useState(0); // Incrémenté de 1 pour forcer le useEffect (re-render)

  const [nbArticles, setNbArticles] = useState(0);
  const [sousCategories, setSousCategories] = useState();

  useEffect(() => {
    // Enlève les warnings inutiles
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

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

    if (nbRefresh === 0) {
      // Articles
      var tousLesArticles = [];
      db.collection("articles")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tousLesArticles.push({
              id: doc.id,
              idSousCategorie: doc.data().idSousCategorie,
              stocks: doc.data().stocks,
              stocksMini: doc.data().stocksMini,
            });
          });
          setNbArticles(tousLesArticles.length);
        })
        .catch((error) => {
          console.log(
            "Erreur en récupérant le document (Recap.js > useEffect() > articles) : ",
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
              nbArticles: tousLesArticles.filter(
                (article) => article.idSousCategorie === doc.id
              ).length,
              nbArticlesACommander: tousLesArticles.filter(
                (article) =>
                  article.idSousCategorie === doc.id &&
                  article.stocks < article.stocksMini
              ).length,
            });
          });
          setSousCategories(toutesLesSousCategories);
          setNbRefresh(nbRefresh + 1);
        })
        .catch((error) => {
          console.log(
            "Erreur en récupérant le document (Recap.js > useEffect() > sousCategories) : ",
            error
          );
        });

      setNbRefresh(nbRefresh + 1);
    }
  }, [nbRefresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setNbRefresh(0);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  function renderEntete() {
    const renderItem = ({ item, index }) => (
      <View
        style={{
          width: 180,
          paddingVertical: 10,
          paddingHorizontal: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginRight: SIZES.radius,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {/* Titre */}
        <View style={{ flexDirection: "column" }}>
          <View style={{ marginleft: SIZES.base }}>
            <View style={{ height: 35 }}>
              <ScrollView nestedScrollEnabled={true}>
                <Text style={{ ...FONTS.body2, flexWrap: "wrap" }}>
                  {item.nom}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Rechercher", {
              aCommander: false,
              sousCategorie: item.id,
            })
          }
        >
          {/* Séparateur */}
          <View
            style={{
              width: 75,
              height: 2,
              backgroundColor: COLORS.yellow,
              marginLeft: 29,
              marginVertical: 5,
              borderRadius: 10,
            }}
          />

          {/* Informations */}
          <View>
            <Text style={{ ...FONTS.h4 }}>
              <Text style={{ fontWeight: "bold" }}>{item.nbArticles}</Text>{" "}
              articles
            </Text>
            <Text
              style={{
                color:
                  item.nbArticlesACommander == 0 ? COLORS.green : COLORS.red,
                ...FONTS.body5,
              }}
            >
              {item.nbArticlesACommander == 0
                ? "Stocks à jour"
                : item.nbArticlesACommander + " à commander"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View
        style={{
          width: "100%",
          height: 380, // 290,
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={images.banniere}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* Bouton Derniers évènements */}
          <View
            style={{
              marginTop: SIZES.padding * 2,
              width: "100%",
              alignItems: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("DerniersEvenements")}
            >
              <Image
                source={icons.derniersEvenements}
                resizeMode="contain"
                style={{ flex: 1, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
          </View>

          {/* Titres */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Récapitulation générale
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                marginTop: SIZES.base,
                paddingTop: SIZES.base,
                fontWeight: "bold",
              }}
            >
              {nbArticles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
              articles dans l'inventaire
            </Text>
          </View>

          {/* Sous-catégories */}
          <View
            style={{
              position: "absolute",
              bottom: 0, // "-30%"
            }}
          >
            <Text
              style={{
                marginLeft: SIZES.padding,
                color: COLORS.white,
                fontWeight: "bold",
                ...FONTS.h2,
              }}
            >
              Sous-catégories
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={sousCategories}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderACommander() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
        onPress={() => navigation.navigate("Rechercher", { aCommander: true })}
      >
        <Image
          source={images.stocks}
          style={{
            width: 30,
            height: 30,
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>À commander</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>
            Voir les articles en manque de stock
          </Text>
        </View>

        <Image
          source={icons.aller}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.gray,
          }}
        />
      </TouchableOpacity>
    );
  }

  function renderAjouterUnArticle() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          backgroundColor: COLORS.secondary,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
        onPress={() => navigation.navigate("Ajouter", { article: true })}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text
            style={{ ...FONTS.h3, fontWeight: "bold", color: COLORS.white }}
          >
            Ajouter une donnée
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.white,
              lineHeight: 18,
              marginTop: SIZES.base,
            }}
          >
            Ajoutez / Modifiez / Supprimez{"\n"}un article, une
            (sous-)catégorie, une marque, un utilisateur...
          </Text>
        </View>

        <Image
          source={icons.plus}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.primary,
          }}
        />
      </TouchableOpacity>
    );
  }

  function renderHistoriqueEntreesSorties() {
    return (
      <HistoriqueEntreesSorties
        customContainerStyle={{ ...styles.shadow }}
        navigation={navigation}
        idArticle={-1}
        number={5}
        personneFiltre="Toutes"
        typeFiltre="Tous"
        periodeFiltre="Toutes"
      />
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderEntete()}
        {renderACommander()}
        {renderAjouterUnArticle()}
        {renderHistoriqueEntreesSorties()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default Recap;
