import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import firebase from "firebase";

import Toast from "react-native-easy-toast";

import { FONTS, SIZES, COLORS, icons, images, dummyData } from "../constants";

const Params = ({ navigation }) => {
  const [nbRefresh, setNbRefresh] = useState(0); // Incrémenté de 1 pour forcer le useEffect (re-render)
  const [toast, setToast] = useState();
  const [themes, setThemes] = useState(dummyData.themes);
  const [notifications, setNotifications] = useState(dummyData.notifications);
  const [parametres, setParametres] = useState({
    id: "",
    theme: themes[0],
    notifEntreesSorties: notifications[0],
    notifACommander: notifications[0],
    notifCreation: notifications[0],
    notifModification: notifications[0],
    notifSuppression: notifications[0],
  });
  const [paramsTMP, setParamsTMP] = useState({
    id: "",
    theme: themes[0],
    notifEntreesSorties: notifications[0],
    notifACommander: notifications[0],
    notifCreation: notifications[0],
    notifModification: notifications[0],
    notifSuppression: notifications[0],
  });

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

    // Paramètres
    var tousLesParametres = [];
    db.collection("parametres")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tousLesParametres.push({
            id: doc.id,
            theme: doc.data().theme === "C" ? themes[0] : themes[1],
            notifEntreesSorties:
              doc.data().notifEntreesSorties === "A"
                ? notifications[0]
                : notifications[1],
            notifACommander:
              doc.data().notifACommander === "A"
                ? notifications[0]
                : notifications[1],
            notifCreation:
              doc.data().notifCreations === "A"
                ? notifications[0]
                : notifications[1],
            notifModification:
              doc.data().notifModifications === "A"
                ? notifications[0]
                : notifications[1],
            notifSuppression:
              doc.data().notifSuppressions === "A"
                ? notifications[0]
                : notifications[1],
          });
        });

        setParametres(tousLesParametres[0]);
        if (nbRefresh === 0) {
          setParamsTMP(tousLesParametres[0]);
        }
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Params.js > useEffect() > parametres) : ",
          error
        );
      });
  }, [nbRefresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setNbRefresh(0);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  function renderEnTete() {
    return (
      <View
        style={{
          width: "100%",
          height: 90,
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
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h15,
              marginBottom: SIZES.base,
            }}
          >
            Paramètres
          </Text>
        </ImageBackground>
      </View>
    );
  }

  function renderMessage() {
    return (
      <Text
        style={{
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding / 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        Attention ! Ces paramètres sont les mêmes pour tous les utilisateurs
      </Text>
    );
  }

  function renderTheme() {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingVertical: SIZES.padding / 2,
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
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Image
            source={icons.theme}
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
            Thème
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
              justifyContent: "center",
              width: 120,
              marginTop: SIZES.base * 2,
              paddingVertical: SIZES.base,
              backgroundColor:
                paramsTMP.theme.id === themes[0].id
                  ? COLORS.primary
                  : COLORS.lightGray,
              borderRadius: 20,
            }}
            onPress={() => {
              var params = paramsTMP;
              params.theme = themes[0];
              setParamsTMP(params);
              setNbRefresh(nbRefresh + 1);
            }}
          >
            <Text
              style={{
                color:
                  paramsTMP.theme.id === themes[0].id
                    ? COLORS.white
                    : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              Clair
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              marginTop: SIZES.base * 2,
              paddingVertical: SIZES.base,
              backgroundColor:
                paramsTMP.theme.id === themes[1].id
                  ? COLORS.primary
                  : COLORS.lightGray,
              borderRadius: 20,
            }}
            onPress={() => {
              var params = paramsTMP;
              params.theme = themes[1];
              setParamsTMP(params);
              setNbRefresh(nbRefresh + 1);
            }}
          >
            <Text
              style={{
                color:
                  paramsTMP.theme.id === themes[1].id
                    ? COLORS.white
                    : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              Sombre
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderNotifications() {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingVertical: SIZES.padding / 2,
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding / 2,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Image
            source={icons.notification}
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
            Notifications
          </Text>
        </View>

        {/* Entrées / Sorties */}
        <Text
          style={{
            ...FONTS.h3,
            marginLeft: SIZES.padding,
            marginTop: SIZES.base,
            fontWeight: "bold",
          }}
        >
          Entrées / Sorties
        </Text>

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
              justifyContent: "center",
              width: 120,
              marginTop: SIZES.base,
              paddingVertical: SIZES.base,
              backgroundColor:
                paramsTMP.notifEntreesSorties.id === notifications[0].id
                  ? COLORS.primary
                  : COLORS.lightGray,
              borderRadius: 20,
            }}
            onPress={() => {
              var params = paramsTMP;
              params.notifEntreesSorties = notifications[0];
              setParamsTMP(params);
              setNbRefresh(nbRefresh + 1);
            }}
          >
            <Text
              style={{
                color:
                  paramsTMP.notifEntreesSorties.id === notifications[0].id
                    ? COLORS.white
                    : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              Activées
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              marginTop: SIZES.base,
              paddingVertical: SIZES.base,
              backgroundColor:
                paramsTMP.notifEntreesSorties.id === notifications[1].id
                  ? COLORS.primary
                  : COLORS.lightGray,
              borderRadius: 20,
            }}
            onPress={() => {
              var params = paramsTMP;
              params.notifEntreesSorties = notifications[1];
              setParamsTMP(params);
              setNbRefresh(nbRefresh + 1);
            }}
          >
            <Text
              style={{
                color:
                  paramsTMP.notifEntreesSorties.id === notifications[1].id
                    ? COLORS.white
                    : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              Désactivées
            </Text>
          </TouchableOpacity>
        </View>

        {/* À Commander */}
        <Text
          style={{
            ...FONTS.h3,
            marginLeft: SIZES.padding,
            marginTop: SIZES.base,
            fontWeight: "bold",
          }}
        >
          À Commander
        </Text>

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
              justifyContent: "center",
              width: 120,
              marginTop: SIZES.base,
              paddingVertical: SIZES.base,
              backgroundColor:
                paramsTMP.notifACommander.id === notifications[0].id
                  ? COLORS.primary
                  : COLORS.lightGray,
              borderRadius: 20,
            }}
            onPress={() => {
              var params = paramsTMP;
              params.notifACommander = notifications[0];
              setParamsTMP(params);
              setNbRefresh(nbRefresh + 1);
            }}
          >
            <Text
              style={{
                color:
                  paramsTMP.notifACommander.id === notifications[0].id
                    ? COLORS.white
                    : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              Activées
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              marginTop: SIZES.base,
              paddingVertical: SIZES.base,
              backgroundColor:
                paramsTMP.notifACommander.id === notifications[1].id
                  ? COLORS.primary
                  : COLORS.lightGray,
              borderRadius: 20,
            }}
            onPress={() => {
              var params = paramsTMP;
              params.notifACommander = notifications[1];
              setParamsTMP(params);
              setNbRefresh(nbRefresh + 1);
            }}
          >
            <Text
              style={{
                color:
                  paramsTMP.notifACommander.id === notifications[1].id
                    ? COLORS.white
                    : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              Désactivées
            </Text>
          </TouchableOpacity>
        </View>

        {/* Données */}
        <Text
          style={{
            ...FONTS.h3,
            marginLeft: SIZES.padding,
            marginTop: SIZES.base,
            fontWeight: "bold",
          }}
        >
          Données
        </Text>

        <View
          style={{
            flexDirection: "column",
            paddingBottom: SIZES.base,
            justifyContent: "space-evenly",
          }}
        >
          {/* Créations */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: SIZES.padding + SIZES.base,
              marginTop: SIZES.base,
            }}
          >
            <Text
              style={{ flex: 0.5, ...FONTS.h4, marginHorizontal: SIZES.base }}
            >
              Créations
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  paddingVertical: SIZES.base,
                  backgroundColor:
                    paramsTMP.notifCreation.id === notifications[0].id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  borderRadius: 20,
                }}
                onPress={() => {
                  var params = paramsTMP;
                  params.notifCreation = notifications[0];
                  setParamsTMP(params);
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text
                  style={{
                    color:
                      paramsTMP.notifCreation.id === notifications[0].id
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body5,
                  }}
                >
                  Activées
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  paddingVertical: SIZES.base,
                  backgroundColor:
                    paramsTMP.notifCreation.id === notifications[1].id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  borderRadius: 20,
                }}
                onPress={() => {
                  var params = paramsTMP;
                  params.notifCreation = notifications[1];
                  setParamsTMP(params);
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text
                  style={{
                    color:
                      paramsTMP.notifCreation.id === notifications[1].id
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body5,
                  }}
                >
                  Désactivées
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modifications */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: SIZES.padding + SIZES.base,
              marginTop: SIZES.base,
            }}
          >
            <Text
              style={{ flex: 0.5, ...FONTS.h4, marginHorizontal: SIZES.base }}
            >
              Modifications
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  paddingVertical: SIZES.base,
                  backgroundColor:
                    paramsTMP.notifModification.id === notifications[0].id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  borderRadius: 20,
                }}
                onPress={() => {
                  var params = paramsTMP;
                  params.notifModification = notifications[0];
                  setParamsTMP(params);
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text
                  style={{
                    color:
                      paramsTMP.notifModification.id === notifications[0].id
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body5,
                  }}
                >
                  Activées
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  paddingVertical: SIZES.base,
                  backgroundColor:
                    paramsTMP.notifModification.id === notifications[1].id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  borderRadius: 20,
                }}
                onPress={() => {
                  var params = paramsTMP;
                  params.notifModification = notifications[1];
                  setParamsTMP(params);
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text
                  style={{
                    color:
                      paramsTMP.notifModification.id === notifications[1].id
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body5,
                  }}
                >
                  Désactivées
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Suppressions */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: SIZES.padding + SIZES.base,
              marginTop: SIZES.base,
            }}
          >
            <Text
              style={{ flex: 0.5, ...FONTS.h4, marginHorizontal: SIZES.base }}
            >
              Suppressions
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  paddingVertical: SIZES.base,
                  backgroundColor:
                    paramsTMP.notifSuppression.id === notifications[0].id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  borderRadius: 20,
                }}
                onPress={() => {
                  var params = paramsTMP;
                  params.notifSuppression = notifications[0];
                  setParamsTMP(params);
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text
                  style={{
                    color:
                      paramsTMP.notifSuppression.id === notifications[0].id
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body5,
                  }}
                >
                  Activées
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  paddingVertical: SIZES.base,
                  backgroundColor:
                    paramsTMP.notifSuppression.id === notifications[1].id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  borderRadius: 20,
                }}
                onPress={() => {
                  var params = paramsTMP;
                  params.notifSuppression = notifications[1];
                  setParamsTMP(params);
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text
                  style={{
                    color:
                      paramsTMP.notifSuppression.id === notifications[1].id
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body5,
                  }}
                >
                  Désactivées
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderBoutonsPersonnalisation() {
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
              parametres.theme.id != paramsTMP.theme.id ||
              parametres.notifEntreesSorties.id !=
                paramsTMP.notifEntreesSorties.id ||
              parametres.notifACommander.id != paramsTMP.notifACommander.id ||
              parametres.notifCreation.id != paramsTMP.notifCreation.id ||
              parametres.notifModification.id !=
                paramsTMP.notifModification.id ||
              parametres.notifSuppression.id != paramsTMP.notifSuppression.id
            ) {
              setParamsTMP(parametres);
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
              parametres.theme.id != paramsTMP.theme.id ||
              parametres.notifEntreesSorties.id !=
                paramsTMP.notifEntreesSorties.id ||
              parametres.notifACommander.id != paramsTMP.notifACommander.id ||
              parametres.notifCreation.id != paramsTMP.notifCreation.id ||
              parametres.notifModification.id !=
                paramsTMP.notifModification.id ||
              parametres.notifSuppression.id != paramsTMP.notifSuppression.id
            ) {
              setParametres(paramsTMP);
              toast.show("Changements enregistrés !", 1000);
              firebase
                .firestore()
                .collection("parametres")
                .doc(parametres.id)
                .update({
                  theme: paramsTMP.theme.id === themes[0].id ? "C" : "S",
                  notifEntreesSorties:
                    paramsTMP.notifEntreesSorties.id === notifications[0].id
                      ? "A"
                      : "D",
                  notifACommander:
                    paramsTMP.notifACommander.id === notifications[0].id
                      ? "A"
                      : "D",
                  notifCreations:
                    paramsTMP.notifCreation.id === notifications[0].id
                      ? "A"
                      : "D",
                  notifModifications:
                    paramsTMP.notifModification.id === notifications[0].id
                      ? "A"
                      : "D",
                  notifSuppressions:
                    paramsTMP.notifSuppression.id === notifications[0].id
                      ? "A"
                      : "D",
                });
              setNbRefresh(nbRefresh + 1);
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

  async function exportFile() {
    var db = firebase.firestore();
    let toutesLesMarques = [];
    await db
      .collection("marques")
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
          "Erreur en récupérant le document (Params.js > exportFile() > marques) : ",
          error
        );
      });

    let toutesLesSousCategories = [];
    await db
      .collection("sousCategories")
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
          "Erreur en récupérant le document (Params.js > exportFile() > sousCategories) : ",
          error
        );
      });

    let toutesLesCategories = [];
    await db
      .collection("categories")
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
          "Erreur en récupérant le document (Params.js > exportFile() > categories) : ",
          error
        );
      });

    let tousLesUtilisateurs = [];
    await db
      .collection("utilisateurs")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tousLesUtilisateurs.push({
            id: doc.id,
            Nom: doc.data().nom,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Params.js > exportFile() > utilisateurs) : ",
          error
        );
      });

    let tousLesArticles = [];
    let idArticles = [];
    await db
      .collection("articles")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          idArticles.push(doc.id);
          let marque = toutesLesMarques.find(
            (marque) => marque.id === doc.data().idMarque
          )?.nom;
          let cat = toutesLesCategories.find(
            (cat) => cat.id === doc.data().idCategorie
          )?.nom;
          let ssCat = toutesLesSousCategories.find(
            (ssCat) => ssCat.id === doc.data().idSousCategorie
          )?.nom;
          tousLesArticles.push({
            Nom: doc.data().nom,
            Référence: doc.data().reference,
            Stocks: doc.data().stocks,
            "Stocks mini": doc.data().stocksMini,
            Marque: marque ? marque : "",
            "Sous catégorie": ssCat ? ssCat : "",
            Catégorie: cat ? cat : "",
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Params.js > exportFile() > articles) : ",
          error
        );
      });
    tousLesArticles.sort((a, b) => a.Nom.localeCompare(b.Nom));
    var ws = XLSX.utils.json_to_sheet(tousLesArticles);
    ws["!cols"] = fitToColumn(tousLesArticles);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Articles");

    let toutLHistorique = [];
    await db
      .collection("historique")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let article =
            tousLesArticles[idArticles.indexOf(doc.data().idArticle)]?.Nom;
          let type =
            doc.data().type + (doc.data().type === "E" ? "ntrée" : "ortie");
          let user = tousLesUtilisateurs.find(
            (utilisateur) => utilisateur.id === doc.data().idUtilisateur
          )?.Nom;
          toutLHistorique.push({
            Article: article ? article : "",
            Type: type ? type : "",
            Nombre: doc.data().nombre,
            Utilisateur: user ? user : "",
            Date: doc.data().date,
          });
        });
      })
      .catch((error) => {
        Alert.alert("error ", "" + error);
        console.log(
          "Erreur en récupérant le document (Params.js > exportFile() > historique) : ",
          error
        );
      });
    toutLHistorique.sort((a, b) => a.Article.localeCompare(b.Article));
    ws = XLSX.utils.json_to_sheet(toutLHistorique);
    ws["!cols"] = fitToColumn(toutLHistorique);
    XLSX.utils.book_append_sheet(wb, ws, "Historique");
    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });
    const uri = FileSystem.cacheDirectory + "MesStocks.xlsx";
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "MyWater data",
      UTI: "com.microsoft.excel.xlsx",
    });
  }

  const fitToColumn = (data) => {
    const columnWidths = [];
    for (const property in data[0]) {
      columnWidths.push({
        wch:
          Math.max(
            property ? property.toString().length : 0,
            ...data.map((obj) =>
              obj[property] ? obj[property].toString().length : 0
            )
          ) + 3,
      });
    }
    return columnWidths;
  };

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

        {/* Bouton */}
        <View
          style={{
            width: "100%",
            paddingBottom: SIZES.base,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.base,
              marginHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding / 2,
              backgroundColor: COLORS.green,
              borderRadius: SIZES.radius,
            }}
            onPress={() => exportFile()}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                fontWeight: "bold",
              }}
            >
              XLSX
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 90 }}>
      {renderEnTete()}

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderMessage()}
        {renderTheme()}
        {renderNotifications()}
        {renderBoutonsPersonnalisation()}

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

export default Params;
