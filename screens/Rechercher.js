import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase";

import { BoutonTexte } from "../components";
import { FONTS, SIZES, COLORS, images, icons, dummyData } from "../constants";

const Rechercher = ({ route, navigation }, props) => {
  const [nbRefresh, setNbRefresh] = useState(1);
  const [voirFiltres, setVoirFiltres] = useState(false);

  const [donnees, setDonnees] = useState({
    categories: [],
    sousCategories: [],
    marques: [],
    types: dummyData.typesFiltresRecherche,
  });
  const [articles, setArticles] = useState({
    base: [],
    tmp: [],
  });

  const [filtres, setFiltres] = useState({
    categorie: {
      id: 0,
      nom: "Toutes",
    },
    sousCategorie: {
      id: 0,
      nom: "Toutes",
    },
    marque: {
      id: 0,
      nom: "Toutes",
    },
    type: {
      id: 0,
      nom: "Tous",
    },
    recherche: "",
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setNbRefresh(0);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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

    if (nbRefresh === 0) {
      var db = firebase.firestore();

      // Catégories
      var toutesLesCategories = [];
      toutesLesCategories.push({
        id: 0,
        nom: "Toutes",
      });
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
            "Erreur en récupérant le document (Rechercher.js > useEffect() > categories) : ",
            error
          );
        });

      // Sous-catégories
      var toutesLesSousCategories = [];
      toutesLesSousCategories.push({
        id: 0,
        nom: "Toutes",
      });
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
            "Erreur en récupérant le document (Rechercher.js > useEffect() > sousCategories) : ",
            error
          );
        });

      // Marques
      var toutesLesMarques = [];
      toutesLesMarques.push({
        id: 0,
        nom: "Toutes",
      });
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
            "Erreur en récupérant le document (Rechercher.js > useEffect() > marques) : ",
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
              idCategorie: doc.data().idCategorie,
              nomCategorie: toutesLesCategories.find(
                (l) => l.id === doc.data().idCategorie
              ).nom,
              idSousCategorie: doc.data().idSousCategorie,
              nomSousCategorie: toutesLesSousCategories.find(
                (l) => l.id === doc.data().idSousCategorie
              ).nom,
              idMarque: doc.data().idMarque,
              nomMarque: toutesLesMarques.find(
                (l) => l.id === doc.data().idMarque
              ).nom,
              stocks: doc.data().stocks,
              stocksMini: doc.data().stocksMini,
            });

            setArticles({
              base: tousLesArticles,
              tmp: tousLesArticles,
            });
            setDonnees({
              categories: toutesLesCategories,
              sousCategories: toutesLesSousCategories,
              marques: toutesLesMarques,
              types: dummyData.typesFiltresRecherche,
            });
            setNbRefresh(nbRefresh + 1);
          });
        })
        .catch((error) => {
          console.log(
            "Erreur en récupérant le document (Rechercher.js > useEffect() > articles) : ",
            error
          );
        });
    } else if (nbRefresh > 0) {
      var idSousCat =
        route !== undefined &&
        route.params !== undefined &&
        route.params.sousCategorie !== undefined
          ? route.params.sousCategorie
          : 0;
      var idType =
        route !== undefined &&
        route.params !== undefined &&
        route.params.aCommander
          ? 1
          : 0;
      setFiltres({
        categorie: {
          id: 0,
          nom: "Toutes",
        },
        sousCategorie: {
          id: idSousCat,
          nom:
            idSousCat !== 0
              ? donnees.sousCategories.find((sscat) => sscat.id === idSousCat)
                  ?.nom
              : "Toutes",
        },
        marque: {
          id: 0,
          nom: "Toutes",
        },
        type: {
          id: dummyData.typesFiltresRecherche[idType].id,
          nom: dummyData.typesFiltresRecherche[idType].nom,
        },
        recherche: "",
      });
    }
  }, [nbRefresh]);

  useEffect(() => {
    var tousLesArticles = articles.base;

    // Trier l'historique suivant le filtre Catégories
    if (filtres.categorie.id !== undefined && filtres.categorie.id !== 0) {
      tousLesArticles = tousLesArticles.filter(
        (ligne) => filtres.categorie.id === ligne.idCategorie
      );
    }

    // Trier l'historique suivant le filtre Sous-Catégories
    if (
      filtres.sousCategorie.id !== undefined &&
      filtres.sousCategorie.id !== 0
    ) {
      tousLesArticles = tousLesArticles.filter(
        (ligne) => filtres.sousCategorie.id === ligne.idSousCategorie
      );
    }

    // Trier l'historique suivant le filtre Marques
    if (filtres.marque.id !== undefined && filtres.marque.id !== 0) {
      tousLesArticles = tousLesArticles.filter(
        (ligne) => filtres.marque.id === ligne.idMarque
      );
    }

    // Trier l'historique suivant le filtre Types
    if (filtres.type.id === "1") {
      tousLesArticles = tousLesArticles.filter(
        (ligne) => ligne.stocks < ligne.stocksMini
      );
    } else if (filtres.type.id === "2") {
      tousLesArticles = tousLesArticles.filter(
        (ligne) => ligne.stocks >= ligne.stocksMini
      );
    }

    // Trier l'historique suivant la recherche
    if (filtres.recherche.length > 0) {
      tousLesArticles = tousLesArticles.filter((ligne) =>
        ligne.nom.toLowerCase().match(filtres.recherche.toLowerCase())
      );
    }

    setArticles({
      base: articles.base,
      tmp: tousLesArticles,
    });
  }, [filtres]);

  function renderBarreRecherche() {
    return (
      <View
        style={{
          width: "100%",
          height: 100,
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={images.banniere}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: SIZES.base,
            }}
          >
            <View
              style={{
                height: 45,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: COLORS.white,
                paddingVertical: 5,
                marginVertical: SIZES.base,
              }}
            >
              <TextInput
                placeholder="Rechercher..."
                placeholderTextColor={COLORS.gray}
                value={filtres.recherche}
                onChangeText={(texte) => {
                  setFiltres({
                    categorie: filtres.categorie,
                    sousCategorie: filtres.sousCategorie,
                    marque: filtres.marque,
                    type: filtres.type,
                    recherche: texte,
                  });
                }}
                style={{
                  flex: 1,
                  marginLeft: 15,
                }}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: SIZES.base,
                  marginRight: SIZES.base,
                }}
                onPress={() => {
                  setFiltres({
                    categorie: filtres.categorie,
                    sousCategorie: filtres.sousCategorie,
                    marque: filtres.marque,
                    type: filtres.type,
                    recherche: "",
                  });
                }}
              >
                <Image
                  source={icons.croix}
                  resizeMode="contain"
                  style={{
                    width: 17,
                    height: 17,
                    tintColor: COLORS.gray,
                    paddingHorizontal: SIZES.base,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderFiltres() {
    const renderItemCategorie = ({ item, index }) => (
      <BoutonTexte
        key={`categorie-${item.id}`}
        nom={item.nom}
        customContainerStyle={{
          height: 30,
          paddingHorizontal: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: 15,
          backgroundColor:
            filtres.categorie.id === item.id
              ? COLORS.primary
              : COLORS.lightGray,
        }}
        customLabelStyle={{
          color: filtres.categorie.id === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          setFiltres({
            categorie: item,
            sousCategorie: filtres.sousCategorie,
            marque: filtres.marque,
            type: filtres.type,
            recherche: filtres.recherche,
          });
        }}
      />
    );

    const renderItemSousCategorie = ({ item, index }) => (
      <BoutonTexte
        key={`sousCategorie-${item.id}`}
        nom={item.nom}
        customContainerStyle={{
          height: 30,
          paddingHorizontal: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: 15,
          backgroundColor:
            filtres.sousCategorie.id === item.id
              ? COLORS.primary
              : COLORS.lightGray,
        }}
        customLabelStyle={{
          color:
            filtres.sousCategorie.id === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          setFiltres({
            categorie: filtres.categorie,
            sousCategorie: item,
            marque: filtres.marque,
            type: filtres.type,
            recherche: filtres.recherche,
          });
        }}
      />
    );

    const renderItemMarque = ({ item, index }) => (
      <BoutonTexte
        key={`marque-${item.id}`}
        nom={item.nom}
        customContainerStyle={{
          height: 30,
          paddingHorizontal: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: 15,
          backgroundColor:
            filtres.marque.id === item.id ? COLORS.primary : COLORS.lightGray,
        }}
        customLabelStyle={{
          color: filtres.marque.id === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          setFiltres({
            categorie: filtres.categorie,
            sousCategorie: filtres.sousCategorie,
            marque: item,
            type: filtres.type,
            recherche: filtres.recherche,
          });
        }}
      />
    );

    const renderItemType = ({ item, index }) => (
      <BoutonTexte
        key={`type-${item.id}`}
        nom={item.nom}
        customContainerStyle={{
          height: 30,
          paddingHorizontal: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: 15,
          backgroundColor:
            filtres.type.id === item.id ? COLORS.primary : COLORS.lightGray,
        }}
        customLabelStyle={{
          color: filtres.type.id === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          setFiltres({
            categorie: filtres.categorie,
            sousCategorie: filtres.sousCategorie,
            marque: filtres.marque,
            type: item,
            recherche: filtres.recherche,
          });
        }}
      />
    );

    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding / 2,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.base,
          }}
        >
          <Text
            style={{ color: COLORS.black, fontWeight: "bold", ...FONTS.h2 }}
          >
            Filtres
          </Text>
          <TouchableOpacity onPress={() => setVoirFiltres(!voirFiltres)}>
            <Image
              source={icons.aller}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.gray,
                transform: voirFiltres
                  ? [{ rotate: "270deg" }]
                  : [{ rotate: "90deg" }],
              }}
            />
          </TouchableOpacity>
        </View>

        {voirFiltres && (
          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: SIZES.base,
              }}
            >
              <Text
                style={{
                  marginLeft: SIZES.padding + SIZES.base,
                  ...FONTS.h3,
                  marginBottom: SIZES.base / 2,
                }}
              >
                Catégories
              </Text>
              <FlatList
                data={donnees.categories}
                renderItem={renderItemCategorie}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: SIZES.base,
              }}
            >
              <Text
                style={{
                  marginLeft: SIZES.padding + SIZES.base,
                  ...FONTS.h3,
                  marginBottom: SIZES.base / 2,
                }}
              >
                Sous-catégories
              </Text>
              <FlatList
                data={donnees.sousCategories}
                renderItem={renderItemSousCategorie}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: SIZES.base,
              }}
            >
              <Text
                style={{
                  marginLeft: SIZES.padding + SIZES.base,
                  ...FONTS.h3,
                  marginBottom: SIZES.base / 2,
                }}
              >
                Marques
              </Text>
              <FlatList
                data={donnees.marques}
                renderItem={renderItemMarque}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: SIZES.base,
              }}
            >
              <Text
                style={{
                  marginLeft: SIZES.padding + SIZES.base,
                  ...FONTS.h3,
                  marginBottom: SIZES.base / 2,
                }}
              >
                Types
              </Text>
              <FlatList
                data={donnees.types}
                renderItem={renderItemType}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        )}
      </View>
    );
  }

  function renderListeArticles() {
    const renderItemArticle = ({ item, index }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.base,
        }}
        onPress={() =>
          navigation.navigate("FicheArticle", {
            idArticle: item.id,
            nouvelArticle: false,
          })
        }
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h3, flexWrap: "wrap" }}>{item.nom}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
            {item.nomCategorie +
              " > " +
              item.nomSousCategorie +
              " > " +
              item.nomMarque}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: item.stocks >= item.stocksMini ? COLORS.green : COLORS.red,
              fontWeight: "bold",
              ...FONTS.body4,
            }}
          >
            {item.stocks}
          </Text>
          <View
            style={{
              width: 10,
              height: 1,
              backgroundColor: COLORS.black,
              borderRadius: 10,
            }}
          />
          <Text style={{ color: COLORS.black, ...FONTS.body5 }}>
            {item.stocksMini}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          height: voirFiltres
            ? SIZES.height - 150 - SIZES.padding * 16
            : SIZES.height - 150 - SIZES.padding * 5,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>
            Liste des articles
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.article}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.yellow,
              }}
            />
            <Text
              style={{
                marginLeft: SIZES.base,
                ...FONTS.h2,
                fontWeight: "bold",
              }}
            >
              {articles.tmp.length}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <FlatList
            contentContainerStyle={{ marginTop: SIZES.radius }}
            scrollEnabled={false}
            data={articles.tmp}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItemArticle}
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
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 90 }}>
      {renderBarreRecherche()}

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFiltres()}
        {renderListeArticles()}
      </ScrollView>
    </View>
  );
};

export default Rechercher;

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
