import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import firebase from "firebase";

import { BoutonTexte } from "../components";
import Toast from "react-native-easy-toast";

import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const widthScreen = Dimensions.get("screen").width;
const hauteurQRCode = 400;
const largeurMasque = widthScreen / 2;

const Scan = ({ navigation }) => {
  const [permissionOK, setPermissionOK] = useState(null);
  const [toast, setToast] = useState();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [articleScanne, setArticleScanne] = useState(false);
  const [article, setArticle] = useState({
    nom: "Aucun article trouvé",
    stocks: 0,
    stocksMini: 0,
    idCategorie: 0,
    idSousCategorie: 0,
    idMarque: 0,
  });
  const [entreeSortie, setEntreeSortie] = useState({
    date: "",
    idArticle: 0,
    idUtilisateur: "",
    nombre: 0,
    type: "E",
  });

  // Demander la permission de la caméra
  const demanderPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermissionOK(status == "granted");
    })();
  };

  const getArticle = async (id) => {
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

    let db = firebase.firestore();
    let articleRecupere;
    await db
      .collection("articles")
      .doc(id)
      .get()
      .then((snapshot) => {
        articleRecupere = snapshot.data();
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Scan.js > getArticle() > articles) : ",
          error
        );
      });

    return articleRecupere;
  };

  // Demander la permission de la caméra dès qu'on arrive sur la page
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      demanderPermission();

      // Utilisateurs
      let db = firebase.firestore();
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

          setEntreeSortie({
            date: getDate(),
            idArticle: 0,
            idUtilisateur: tousLesUtilisateurs[0].id,
            nombre: 0,
            type: "E",
          });
          setArticle({
            nom: "Aucun article trouvé",
            stocks: 0,
            stocksMini: 0,
            idCategorie: 0,
            idSousCategorie: 0,
            idMarque: 0,
          });
          setUtilisateurs(tousLesUtilisateurs);
        })
        .catch((error) => {
          console.log(
            "Erreur en récupérant le document (Scan.js > getArticle() > utilisateurs) : ",
            error
          );
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  function getDate() {
    let maintenant = new Date();
    let annee = maintenant.getFullYear().toString();
    let mois =
      maintenant.getMonth() + 1 < 10
        ? "0" + (maintenant.getMonth() + 1).toString()
        : (maintenant.getMonth() + 1).toString();
    let jour =
      maintenant.getDate() < 10
        ? "0" + maintenant.getDate().toString()
        : maintenant.getDate().toString();
    let heure =
      maintenant.getHours() < 10
        ? "0" + maintenant.getHours().toString()
        : maintenant.getHours().toString();
    let minute =
      maintenant.getMinutes() < 10
        ? "0" + maintenant.getMinutes().toString()
        : maintenant.getMinutes().toString();
    let seconde =
      maintenant.getSeconds() < 10
        ? "0" + maintenant.getSeconds().toString()
        : maintenant.getSeconds().toString();

    return (
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
      seconde
    );
  }

  // Lorsqu'un qrcode/barcode est scanné (type = qrcode/barcode, data = contenu)
  const handleScan = async ({ type, data }) => {
    if (!articleScanne) {
      let prefixe = data.split(":")[0];

      if (prefixe === "MesStocks_idArticle") {
        let articleAJour = await getArticle(data.split(":")[1]);
        setArticle(articleAJour);

        setEntreeSortie({
          date: getDate(),
          idArticle: data.split(":")[1],
          idUtilisateur:
            entreeSortie.idUtilisateur.length > 0
              ? entreeSortie.idUtilisateur
              : utilisateurs[0].id,
          nombre: entreeSortie.nombre > 0 ? entreeSortie.nombre : 1,
          type: entreeSortie.type.length > 0 ? entreeSortie.type : "E",
        });
        setArticleScanne(true);
      }
    }
  };

  function renderNombre() {
    return (
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            marginLeft: SIZES.padding / 2,
            color: COLORS.black,
            ...FONTS.body3,
          }}
        >
          Quantité ({article.stocks}/{article.stocksMini})
        </Text>
        <View
          style={{
            height: 35,
            width: "80%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 25,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.white,
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
              setEntreeSortie({
                date: entreeSortie.date,
                idArticle: entreeSortie.idArticle,
                idUtilisateur: entreeSortie.idUtilisateur,
                nombre:
                  entreeSortie.nombre > 1
                    ? entreeSortie.nombre - 1
                    : entreeSortie.nombre,
                type: entreeSortie.type,
              });
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

          {/* Quantité transférée */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholderTextColor={COLORS.gray}
              value={`${entreeSortie.nombre}`}
              onChangeText={(texte) => {
                let nombre = 0;

                if (texte.length > 0) {
                  let texteInt = parseInt(texte);

                  if (texteInt > 1 && texteInt <= article.stocks) {
                    nombre = texteInt;
                  }
                }

                setEntreeSortie({
                  date: entreeSortie.date,
                  idArticle: entreeSortie.idArticle,
                  idUtilisateur: entreeSortie.idUtilisateur,
                  nombre: nombre,
                  type: entreeSortie.type,
                });
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
              setEntreeSortie({
                date: entreeSortie.date,
                idArticle: entreeSortie.idArticle,
                idUtilisateur: entreeSortie.idUtilisateur,
                nombre:
                  entreeSortie.nombre < article.stocks
                    ? entreeSortie.nombre + 1
                    : entreeSortie.nombre,
                type: entreeSortie.type,
              });
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
    );
  }

  function renderType() {
    return (
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            marginLeft: SIZES.padding / 2,
            color: COLORS.black,
            ...FONTS.body3,
          }}
        >
          Type
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 35,
              paddingHorizontal: SIZES.base * 2,
              backgroundColor:
                entreeSortie.type === "E" ? COLORS.primary : COLORS.white,
              borderColor:
                entreeSortie.type === "E" ? COLORS.primary : COLORS.lightGray,
              borderWidth: 1,
              borderRadius: 20,
            }}
            onPress={() => {
              setEntreeSortie({
                date: entreeSortie.date,
                idArticle: entreeSortie.idArticle,
                idUtilisateur: entreeSortie.idUtilisateur,
                nombre: entreeSortie.nombre,
                type: "E",
              });
            }}
          >
            <Text
              style={{
                color: entreeSortie.type === "E" ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
            >
              Entrée
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 35,
              paddingHorizontal: SIZES.base * 2,
              backgroundColor:
                entreeSortie.type === "S" ? COLORS.primary : COLORS.white,
              borderColor:
                entreeSortie.type === "S" ? COLORS.primary : COLORS.lightGray,
              borderWidth: 1,
              borderRadius: 20,
            }}
            onPress={() => {
              setEntreeSortie({
                date: entreeSortie.date,
                idArticle: entreeSortie.idArticle,
                idUtilisateur: entreeSortie.idUtilisateur,
                nombre: entreeSortie.nombre,
                type: "S",
              });
            }}
          >
            <Text
              style={{
                color: entreeSortie.type === "S" ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
            >
              Sortie
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderPersonnes() {
    const renderItemUtilisateur = ({ item, index }) => (
      <BoutonTexte
        key={`type-${item.id}`}
        nom={item.nom}
        customContainerStyle={{
          height: 30,
          paddingHorizontal: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: 15,
          backgroundColor:
            entreeSortie.idUtilisateur === item.id
              ? COLORS.primary
              : COLORS.lightGray,
        }}
        customLabelStyle={{
          color:
            entreeSortie.idUtilisateur === item.id ? COLORS.white : COLORS.gray,
        }}
        myOnPress={() => {
          setEntreeSortie({
            date: entreeSortie.date,
            idArticle: entreeSortie.idArticle,
            idUtilisateur: item.id,
            nombre: entreeSortie.nombre,
            type: entreeSortie.type,
          });
        }}
      />
    );

    return (
      <View
        style={{
          flexDirection: "column",
          marginBottom: SIZES.base,
        }}
      >
        <Text
          style={{
            marginLeft: SIZES.padding,
            ...FONTS.h3,
            marginBottom: SIZES.base / 2,
          }}
        >
          Personne
        </Text>
        <FlatList
          data={utilisateurs}
          renderItem={renderItemUtilisateur}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function renderMasqueQRCode() {
    return (
      <View testID="capture-box-container" style={styles.captureBox}>
        <View testID="top-left-corner" style={styles.topLeft} />
        <View testID="top-right-corner" style={styles.topRight} />
        <View testID="bottom-right-corner" style={styles.bottomRight} />
        <View testID="bottom-left-corner" style={styles.bottomLeft} />
      </View>
    );
  }

  // Vérification des permissions, et return en conséquence
  if (permissionOK === null || permissionOK === false) {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ margin: 10 }}>Pas d'accès à la caméra.</Text>
        <Button
          title="Autoriser la caméra"
          onPress={() => demanderPermission}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 90 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          width: "100%",
          backgroundColor: COLORS.black,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            ...StyleSheet.absoluteFill,
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={handleScan}
            style={{ height: "400%", width: "100%" }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "column",
            paddingVertical: SIZES.padding / 2,
            marginHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            ...styles.shadow,
          }}
        >
          {/* Titre */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: SIZES.padding,
              paddingBottom: SIZES.padding / 2,
            }}
          >
            <Image
              source={icons.information}
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
                color: COLORS.black,
                fontWeight: "bold",
                ...FONTS.h2,
              }}
            >
              Informations du flux
            </Text>
          </View>

          {/* Nom de l'article */}
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: SIZES.padding,
              marginBottom: SIZES.padding / 2,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Article : </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.gray,
                textAlign: "center",
              }}
            >
              {article.nom}
            </Text>
          </View>

          {/* Personnes */}
          {renderPersonnes()}

          {/* Nombre et Type */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: SIZES.padding / 2,
            }}
          >
            {renderNombre()}
            {renderType()}
          </View>

          {/* Date */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: SIZES.padding,
              marginTop: SIZES.padding / 2,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Date du flux : </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.gray,
              }}
            >
              {entreeSortie.date}
            </Text>
          </View>

          {/* Boutons */}
          <View
            style={{
              flexDirection: "row",
              paddingBottom: SIZES.base,
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: 150,
                marginTop: SIZES.base * 2,
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
                borderColor: COLORS.lightGray,
                borderWidth: 1,
                borderRadius: 20,
              }}
              onPress={() => {
                setArticleScanne(false);
                setArticle({
                  nom: "Aucun article trouvé",
                  stocks: 0,
                  stocksMini: 0,
                  idCategorie: 0,
                  idSousCategorie: 0,
                  idMarque: 0,
                });
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
                  color: COLORS.gray,
                  ...FONTS.h2,
                }}
              >
                Scanner
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: 150,
                marginTop: SIZES.base * 2,
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 1,
                borderRadius: 20,
              }}
              onPress={async () => {
                if (
                  entreeSortie.idArticle.length > 0 &&
                  entreeSortie.nombre <= article.stocks
                ) {
                  let evenement = {
                    date: entreeSortie.date,
                    nomObjet: article.nom,
                    objet: "A",
                    type: "M",
                  };
                  let stocksAJour =
                    article.stocks +
                    (entreeSortie.type === "E"
                      ? entreeSortie.nombre
                      : -entreeSortie.nombre);

                  // Mise à jour des stocks de l'article
                  await firebase
                    .firestore()
                    .collection("articles")
                    .doc(entreeSortie.idArticle)
                    .update({
                      nom: article.nom,
                      idCategorie: article.idCategorie,
                      idSousCategorie: article.idSousCategorie,
                      idMarque: article.idMarque,
                      stocks: stocksAJour,
                      stocksMini: article.stocksMini,
                    });

                  // Mise à jour de l'historique
                  await firebase
                    .firestore()
                    .collection("historique")
                    .add(entreeSortie);

                  // Mise à jour des derniers évènements
                  await firebase
                    .firestore()
                    .collection("derniersEvenements")
                    .add(evenement);

                  setArticle({
                    nom: article.nom,
                    idCategorie: article.idCategorie,
                    idSousCategorie: article.idSousCategorie,
                    idMarque: article.idMarque,
                    stocks: stocksAJour,
                    stocksMini: article.stocksMini,
                  });
                  setEntreeSortie({
                    date: entreeSortie.date,
                    idArticle: entreeSortie.idArticle,
                    idUtilisateur: entreeSortie.idUtilisateur,
                    nombre:
                      entreeSortie.nombre > stocksAJour
                        ? 1
                        : entreeSortie.nombre,
                    type: entreeSortie.type,
                  });
                  toast.show("Stocks de l'article à jour.", 2500);
                } else {
                  toast.show("L'article n'a pas assez de stocks.", 2500);
                }
              }}
            >
              <Image
                source={icons.entree_sortie}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.yellow,
                }}
              />
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.h2,
                }}
              >
                Valider
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Masque QRCode */}
      {renderMasqueQRCode()}

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
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  edge: {
    borderColor: "white",
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10,
    position: "absolute",
    height: 50,
    width: 44,
  },
  bottomRight: {
    transform: [{ rotate: "180deg" }],
    borderColor: "white",
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10,
    position: "absolute",
    height: 50,
    width: 44,
    right: 0,
    bottom: 0,
  },
  bottomLeft: {
    transform: [{ rotateX: "180deg" }],
    borderColor: "white",
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10,
    position: "absolute",
    height: 50,
    width: 44,
    bottom: 0,
    left: 0,
  },
  captureBox: {
    ...StyleSheet.absoluteFill,
    height: largeurMasque,
    width: largeurMasque,
    top: (hauteurQRCode - largeurMasque) / 2,
    left: (hauteurQRCode - largeurMasque) / 2,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  topLeft: {
    borderColor: "white",
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10,
    position: "absolute",
    height: 50,
    width: 44,
    left: 0,
    top: 0,
  },
  topRight: {
    transform: [{ rotateY: "180deg" }],
    borderColor: "white",
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10,
    position: "absolute",
    height: 50,
    width: 44,
    top: 0,
    right: 0,
  },
});

export default Scan;
