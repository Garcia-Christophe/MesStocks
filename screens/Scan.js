import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import firebase from "firebase";

import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Scan = () => {
  const [permissionOK, setPermissionOK] = useState(null);
  const [articleScanne, setArticleScanne] = useState(false);
  const [contenu, setContenu] = useState("vide");
  const [article, setArticle] = useState({
    nom: "Aucun article trouvé",
    stocks: 0,
    stocksMini: 0,
    entrees: 0,
    sorties: 0,
    entreesSorties: [],
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

    var db = firebase.firestore();
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
    setArticle({
      nom: "Aucun article trouvé",
      stocks: 0,
      stocksMini: 0,
      entrees: 0,
      sorties: 0,
      entreesSorties: [],
      idCategorie: 0,
      idSousCategorie: 0,
      idMarque: 0,
    });
    demanderPermission();
  }, []);

  // Lorsqu'un qrcode/barcode est scanné (type = qrcode/barcode, data = contenu)
  const handleScan = async ({ type, data }) => {
    let prefixe = data.split(":")[0];

    if (prefixe === "MesStocks_idArticle") {
      setContenu(data);
      let articleAJour = await getArticle(data.split(":")[1]);
      setArticle(articleAJour);
      let entreeSortieAJour = entreeSortie;
      entreeSortieAJour.idArticle = data;
      entreeSortieAJour.type = "E";
      entreeSortieAJour.nombre = 1;
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
      entreeSortieAJour.date =
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
        seconde;
      setEntreeSortie(entreeSortieAJour);
      setArticleScanne(true);
    }
  };

  function renderStock() {
    return (
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
            let entreeSortieAJour = entreeSortie;
            entreeSortieAJour.nombre =
              entreeSortieAJour.nombre > 1
                ? entreeSortieAJour.nombre - 1
                : entreeSortieAJour.nombre;
            setEntreeSortie(entreeSortieAJour);
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
              let entreeSortieAJour = entreeSortie;

              if (texte.length > 0) {
                let texteInt = parseInt(texte);

                if (texteInt > 1 && texteInt <= article.stocks) {
                  entreeSortieAJour.nombre = texteInt;
                }
              } else {
                entreeSortieAJour.nombre = 0;
              }

              setEntreeSortie(entreeSortieAJour);
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
            let entreeSortieAJour = entreeSortie;
            entreeSortieAJour.nombre =
              entreeSortieAJour.nombre < article.stocks
                ? entreeSortieAJour.nombre + 1
                : entreeSortieAJour.nombre;
            setEntreeSortie(entreeSortieAJour);
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
    );
  }

  // Vérification des permissions, et return en conséquence
  if (permissionOK === null) {
    return (
      <View style={styles.container}>
        <Text>L'application a besoin de votre permission.</Text>
      </View>
    );
  }

  if (permissionOK === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Pas d'accès à la caméra.</Text>
        <Button
          title="Autoriser la caméra"
          onPress={() => demanderPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.qrcodebox}>
        <BarCodeScanner
          onBarCodeScanned={articleScanne ? undefined : handleScan}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.texteContenu}>{article.nom}</Text>
      {articleScanne && (
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
          onPress={() => setArticleScanne(false)}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              fontWeight: "bold",
            }}
          >
            Scanner
          </Text>
        </TouchableOpacity>
      )}

      {renderStock()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
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
  qrcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "white",
  },
  texteContenu: {
    fontSize: 16,
    margin: 20,
  },
});

export default Scan;
