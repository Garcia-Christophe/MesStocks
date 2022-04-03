import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import firebase from "firebase";

import QRCode from "react-native-qrcode-svg";
import Toast from "react-native-easy-toast";

import { BarreRetour, BoutonTexte } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const FicheArticle = ({ navigation, route }) => {
  const [nbRefresh, setNbRefresh] = useState(0); // Incrémenté de 1 pour forcer le useEffect (re-render)
  const [toast, setToast] = useState();
  const [email, setEmail] = useState("");
  const [article, setArticle] = useState({
    id: -1,
    nom: "",
    idCategorie: 0,
    idSousCategorie: 0,
    idMarque: 0,
    stocks: 0,
    stocksMini: 0,
  });
  const [articleTMP, setArticleTMP] = useState({
    id: -1,
    nom: "",
    idCategorie: 0,
    idSousCategorie: 0,
    idMarque: 0,
    stocks: 0,
    stocksMini: 0,
  });

  const [categories, setCategories] = useState();
  const [sousCategories, setSousCategories] = useState();
  const [marques, setMarques] = useState();

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
            idCategorie: doc.data().idCategorie,
            idSousCategorie: doc.data().idSousCategorie,
            idMarque: doc.data().idMarque,
            stocks: doc.data().stocks,
            stocksMini: doc.data().stocksMini,
          });
        });

        if (
          route != undefined &&
          route.params != undefined &&
          route.params.idArticle != undefined
        ) {
          let article = tousLesArticles.filter(
            (ligne) => ligne.id === route.params.idArticle
          )[0];
          if (nbRefresh === 0) {
            setArticleTMP(article);
          }
          setArticle(article);
        }
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (FicheArticle.js > useEffect() > articles) : ",
          error
        );
      });

    // Catégories
    var toutesLesCategories = [];
    toutesLesCategories.push({
      id: 0,
      nom: "Aucune",
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
        setCategories(toutesLesCategories);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (FicheArticle.js > useEffect() > categories) : ",
          error
        );
      });

    // Sous-catégories
    var toutesLesSousCategories = [];
    toutesLesSousCategories.push({
      id: 0,
      nom: "Aucune",
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
        setSousCategories(toutesLesSousCategories);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (FicheArticle.js > useEffect() > sousCategories) : ",
          error
        );
      });

    // Marques
    var toutesLesMarques = [];
    toutesLesMarques.push({
      id: 0,
      nom: "Aucune",
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
        setMarques(toutesLesMarques);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (FicheArticle.js > useEffect() > marques) : ",
          error
        );
      });
  }, [nbRefresh]);

  function renderDesignation() {
    return (
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
            ...styles.shadow,
          }}
        >
          <TextInput
            placeholder="Désignation de l'article..."
            placeholderTextColor={COLORS.gray}
            value={articleTMP.nom}
            onChangeText={(texte) => {
              let articleAJour = articleTMP;
              articleAJour.nom = texte;
              setArticleTMP(articleAJour);
              setNbRefresh(nbRefresh + 1);
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
              let articleAJour = articleTMP;
              articleAJour.nom = "";
              setArticleTMP(articleAJour);
              setNbRefresh(nbRefresh + 1);
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
    );
  }

  function renderStocks() {
    return (
      <View
        style={{
          flexDirection: "column",
          marginVertical: SIZES.base * 2,
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "40%",
            }}
          >
            <Image
              source={images.stocks}
              style={{
                height: 25,
                width: 25,
              }}
            />

            <Text
              style={{
                marginLeft: SIZES.base,
                ...FONTS.h3,
                fontWeight: "bold",
              }}
            >
              Stocks
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "40%",
            }}
          >
            <Image
              source={images.stocksMini}
              style={{
                height: 25,
                width: 25,
              }}
            />

            <Text
              style={{
                marginLeft: SIZES.base,
                ...FONTS.h3,
                fontWeight: "bold",
              }}
            >
              Stocks mini
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              height: 45,
              width: "40%",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 25,
              borderWidth: 1,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.white,
              paddingVertical: 5,
              marginVertical: SIZES.base,
            }}
          >
            {/* Moins */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: SIZES.base,
                marginRight: SIZES.base,
              }}
              onPress={() => {
                let articleAJour = articleTMP;
                articleAJour.stocks =
                  articleAJour.stocks > 0
                    ? articleAJour.stocks - 1
                    : articleAJour.stocks;
                setArticleTMP(articleAJour);
                setNbRefresh(nbRefresh + 1);
              }}
            >
              <Image
                source={icons.moins}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                  tintColor: COLORS.gray,
                  paddingHorizontal: SIZES.base,
                }}
              />
            </TouchableOpacity>

            {/* Stocks */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholderTextColor={COLORS.gray}
                value={`${articleTMP.stocks}`}
                onChangeText={(texte) => {
                  let articleAJour = articleTMP;
                  articleAJour.stocks = texte.length <= 0 ? 0 : parseInt(texte);
                  setArticleTMP(articleAJour);
                  setNbRefresh(nbRefresh + 1);
                }}
              />
            </View>

            {/* Plus */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: SIZES.base,
                marginRight: SIZES.base,
              }}
              onPress={() => {
                let articleAJour = articleTMP;
                articleAJour.stocks = articleAJour.stocks + 1;
                setArticleTMP(articleAJour);
                setNbRefresh(nbRefresh + 1);
              }}
            >
              <Image
                source={icons.plus}
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

          <View
            style={{
              height: 45,
              width: "40%",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 25,
              borderWidth: 1,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.white,
              paddingVertical: 5,
              marginVertical: SIZES.base,
            }}
          >
            {/* Moins */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: SIZES.base,
                marginRight: SIZES.base,
              }}
              onPress={() => {
                let articleAJour = articleTMP;
                articleAJour.stocksMini =
                  articleAJour.stocksMini > 0
                    ? articleAJour.stocksMini - 1
                    : articleAJour.stocksMini;
                setArticleTMP(articleAJour);
                setNbRefresh(nbRefresh + 1);
              }}
            >
              <Image
                source={icons.moins}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                  tintColor: COLORS.gray,
                  paddingHorizontal: SIZES.base,
                }}
              />
            </TouchableOpacity>

            {/* Stocks mini */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholderTextColor={COLORS.gray}
                value={`${articleTMP.stocksMini}`}
                onChangeText={(texte) => {
                  let articleAJour = articleTMP;
                  articleAJour.stocksMini =
                    texte.length <= 0 ? 0 : parseInt(texte);
                  setArticleTMP(articleAJour);
                  setNbRefresh(nbRefresh + 1);
                }}
              />
            </View>

            {/* Plus */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: SIZES.base,
                marginRight: SIZES.base,
              }}
              onPress={() => {
                let articleAJour = articleTMP;
                articleAJour.stocksMini = articleAJour.stocksMini + 1;
                setArticleTMP(articleAJour);
                setNbRefresh(nbRefresh + 1);
              }}
            >
              <Image
                source={icons.plus}
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
      </View>
    );
  }

  function renderParents() {
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
            articleTMP.idCategorie === item.id
              ? COLORS.primary
              : COLORS.lightGray,
        }}
        customLabelStyle={{
          color:
            articleTMP.idCategorie === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          let articleAJour = articleTMP;
          articleAJour.idCategorie = item.id;
          setArticleTMP(articleAJour);
          setNbRefresh(nbRefresh + 1);
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
            articleTMP.idSousCategorie === item.id
              ? COLORS.primary
              : COLORS.lightGray,
        }}
        customLabelStyle={{
          color:
            articleTMP.idSousCategorie === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          let articleAJour = articleTMP;
          articleAJour.idSousCategorie = item.id;
          setArticleTMP(articleAJour);
          setNbRefresh(nbRefresh + 1);
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
            articleTMP.idMarque === item.id ? COLORS.primary : COLORS.lightGray,
        }}
        customLabelStyle={{
          color: articleTMP.idMarque === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          let articleAJour = articleTMP;
          articleAJour.idMarque = item.id;
          setArticleTMP(articleAJour);
          setNbRefresh(nbRefresh + 1);
        }}
      />
    );

    return (
      <View
        style={{
          flexDirection: "column",
          marginVertical: SIZES.base * 2,
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: SIZES.padding,
            marginBottom: SIZES.base,
            alignItems: "center",
          }}
        >
          <Image
            source={icons.parents}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.yellow,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.padding / 2,
              ...FONTS.h2,
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            Parents
          </Text>
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
            Catégorie
          </Text>
          <FlatList
            data={categories}
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
            Sous-catégorie
          </Text>
          <FlatList
            data={sousCategories}
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
            Marque
          </Text>
          <FlatList
            data={marques}
            renderItem={renderItemMarque}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderBoutonHistorique() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: SIZES.base * 2,
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
        onPress={() => {
          if (route.params.nouvelArticle) {
            toast.show(
              "Pas d'historique pour un article encore inexistant.",
              2500
            );
          } else {
            navigation.navigate("Historique", { idArticle: article.id });
          }
        }}
      >
        <Image
          source={icons.entree_sortie}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.yellow,
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>Historique</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>
            Voir l'historique des entrées/sorties de cet article
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

  function renderBoutons() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          paddingBottom: SIZES.base,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            marginVertical: SIZES.base * 2,
            paddingVertical: SIZES.padding / 2,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            ...styles.shadow,
          }}
          onPress={() => {
            if (
              article.nom != articleTMP.nom ||
              article.idCategorie != articleTMP.idCategorie ||
              article.idSousCategorie != articleTMP.idSousCategorie ||
              article.idMarque != articleTMP.idMarque ||
              article.stocks != articleTMP.stocks ||
              article.stocksMini != articleTMP.stocksMini
            ) {
              setArticleTMP(article);
              toast.show("Changements annulés.", 1000);
              setNbRefresh(nbRefresh + 1);
            } else {
              toast.show("Aucun changement n'a été fait.", 1000);
            }
          }}
        >
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h2,
              fontWeight: "bold",
            }}
          >
            Annuler
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            marginVertical: SIZES.base * 2,
            paddingVertical: SIZES.padding / 2,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius,
            ...styles.shadow,
          }}
          onPress={() => {
            if (
              article.nom != articleTMP.nom ||
              article.idCategorie != articleTMP.idCategorie ||
              article.idSousCategorie != articleTMP.idSousCategorie ||
              article.idMarque != articleTMP.idMarque ||
              article.stocks != articleTMP.stocks ||
              article.stocksMini != articleTMP.stocksMini
            ) {
              if (articleTMP.nom.length <= 0) {
                toast.show(
                  "Veuillez spécifier la désignation de l'article.",
                  2500
                );
              } else {
                if (route.params.nouvelArticle) {
                  setArticle(articleTMP);
                  toast.show("Article enregistré !", 1000);
                  firebase.firestore().collection("articles").add({
                    nom: articleTMP.nom,
                    idCategorie: articleTMP.idCategorie,
                    idSousCategorie: articleTMP.idSousCategorie,
                    idMarque: articleTMP.idMarque,
                    stocks: articleTMP.stocks,
                    stocksMini: articleTMP.stocksMini,
                    entrees: 0,
                    sorties: 0,
                  });

                  var maintenant = new Date();
                  var annee = maintenant.getFullYear().toString();
                  var mois =
                    maintenant.getMonth() + 1 < 10
                      ? "0" + (maintenant.getMonth() + 1).toString()
                      : (maintenant.getMonth() + 1).toString();
                  var jour =
                    maintenant.getDate() < 10
                      ? "0" + maintenant.getDate().toString()
                      : maintenant.getDate().toString();
                  var heure =
                    maintenant.getHours() < 10
                      ? "0" + maintenant.getHours().toString()
                      : maintenant.getHours().toString();
                  var minute =
                    maintenant.getMinutes() < 10
                      ? "0" + maintenant.getMinutes().toString()
                      : maintenant.getMinutes().toString();
                  var seconde =
                    maintenant.getSeconds() < 10
                      ? "0" + maintenant.getSeconds().toString()
                      : maintenant.getSeconds().toString();
                  firebase
                    .firestore()
                    .collection("derniersEvenements")
                    .add({
                      nomObjet: articleTMP.nom,
                      objet: "A",
                      type: "A",
                      date:
                        jour +
                        "/" +
                        mois +
                        "/" +
                        annee +
                        " " +
                        heure +
                        ":" +
                        minute +
                        ":" +
                        seconde,
                    });

                  setNbRefresh(nbRefresh + 1);
                  navigation.goBack();
                } else {
                  setArticle(articleTMP);
                  toast.show("Changements enregistrés !", 1000);
                  firebase
                    .firestore()
                    .collection("articles")
                    .doc(article.id)
                    .update({
                      nom: articleTMP.nom,
                      idCategorie: articleTMP.idCategorie,
                      idSousCategorie: articleTMP.idSousCategorie,
                      idMarque: articleTMP.idMarque,
                      stocks: articleTMP.stocks,
                      stocksMini: articleTMP.stocksMini,
                    });

                  var maintenant = new Date();
                  var annee = maintenant.getFullYear().toString();
                  var mois =
                    maintenant.getMonth() + 1 < 10
                      ? "0" + (maintenant.getMonth() + 1).toString()
                      : (maintenant.getMonth() + 1).toString();
                  var jour =
                    maintenant.getDate() < 10
                      ? "0" + maintenant.getDate().toString()
                      : maintenant.getDate().toString();
                  var heure =
                    maintenant.getHours() < 10
                      ? "0" + maintenant.getHours().toString()
                      : maintenant.getHours().toString();
                  var minute =
                    maintenant.getMinutes() < 10
                      ? "0" + maintenant.getMinutes().toString()
                      : maintenant.getMinutes().toString();
                  var seconde =
                    maintenant.getSeconds() < 10
                      ? "0" + maintenant.getSeconds().toString()
                      : maintenant.getSeconds().toString();
                  firebase
                    .firestore()
                    .collection("derniersEvenements")
                    .add({
                      nomObjet: articleTMP.nom,
                      objet: "A",
                      type: "M",
                      date:
                        jour +
                        "/" +
                        mois +
                        "/" +
                        annee +
                        " " +
                        heure +
                        ":" +
                        minute +
                        ":" +
                        seconde,
                    });

                  setNbRefresh(nbRefresh + 1);
                }
              }
            } else {
              toast.show("Aucun changement n'a été fait.", 1000);
            }
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              fontWeight: "bold",
            }}
          >
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderQRCode() {
    return (
      <View
        style={{
          flexDirection: "column",
          marginVertical: SIZES.base * 2,
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: SIZES.padding,
              marginBottom: SIZES.base,
              alignItems: "center",
            }}
          >
            <Image
              source={icons.qrcode}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.yellow,
              }}
            />

            <Text
              style={{
                marginLeft: SIZES.padding / 2,
                ...FONTS.h2,
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              QR Code
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QRCode
              style={{
                alignItems: "center",
              }}
              value={`MesStocks_idArticle:${article.id}`}
              size={150}
              color={COLORS.primary}
            />
          </View>
        </View>
      </View>
    );
  }

  async function exportFile() {
    Alert.alert(
      "Ficher exporté avec succès !",
      "Chemin d'accès : " + "Downloads/MS-Article_FZ048FIH218765A.xlsx"
    );
  }

  function renderExportation() {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingVertical: SIZES.padding / 2,
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding / 2,
          marginBottom: SIZES.padding,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        {/* Titre */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Image
            source={icons.exportation}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.yellow,
            }}
          />
          <Text
            style={{
              ...FONTS.h2,
              fontWeight: "bold",
              marginLeft: SIZES.padding / 2 + 5,
            }}
          >
            Exportation
          </Text>
        </View>

        {/* Email */}
        <View
          style={{
            height: 45,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.gray,
            backgroundColor: COLORS.white,
            paddingVertical: 5,
            marginTop: SIZES.padding,
            marginBottom: SIZES.base,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={(texte) => setEmail(texte)}
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
            onPress={() => setEmail("")}
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

        {/* Bouton */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingBottom: SIZES.base,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              marginTop: SIZES.base,
              paddingVertical: SIZES.padding / 2,
              backgroundColor: COLORS.green,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              if (email.length > 0) {
                setEmail("");
                toast.show("Exportation réussie !", 1000);
              } else {
                toast.show("Veuillez saisir l'email.", 1000);
              }
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                fontWeight: "bold",
              }}
            >
              Exporter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ paddingBottom: SIZES.padding, backgroundColor: COLORS.white }}
      >
        <BarreRetour
          right={!route.params.nouvelArticle}
          idArticle={article.id}
          nomArticle={article.nom}
          color={COLORS.black}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDesignation()}
        {renderStocks()}
        {renderParents()}
        {renderBoutonHistorique()}
        {renderBoutons()}

        {/* Séparateur */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: SIZES.padding / 2,
          }}
        >
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: COLORS.gray,
            }}
          />
        </View>

        {renderQRCode()}
        {renderExportation()}
      </ScrollView>

      {/* Toast */}
      <Toast
        ref={(toast) => setToast(toast)}
        position={"bottom"}
        fadeInDuration={500}
        fadeOutDuration={750}
        opacity={0.8}
        style={{
          backgroundColor: COLORS.gray,
          borderRadius: 20,
          padding: SIZES.padding / 2,
        }}
      />
    </View>
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

export default FicheArticle;
