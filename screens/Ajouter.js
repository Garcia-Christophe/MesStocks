import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import firebase from "firebase";

import { FONTS, SIZES, COLORS, images, icons } from "../constants";

const Ajouter = ({ navigation }) => {
  const [nbRefresh, setNbRefresh] = useState(0); // Incrémenté de 1 pour forcer le useEffect (re-render)

  const [nbTotalArticles, setNbTotalArticles] = useState();
  const [nbTotalCategories, setNbTotalCategories] = useState();
  const [nbTotalSousCategories, setNbTotalSousCategories] = useState();
  const [nbTotalMarques, setNbTotalMarques] = useState();
  const [nbTotalUtilisateurs, setNbTotalUtilisateurs] = useState();

  const [categories, setCategories] = useState();
  const [sousCategories, setSousCategories] = useState();
  const [marques, setMarques] = useState();
  const [utilisateurs, setUtilisateurs] = useState();

  const [modalCategorieOuverte, setModalCategorieOuverte] = useState(false);
  const [modalSousCategorieOuverte, setModalSousCategorieOuverte] = useState(
    false
  );
  const [modalMarqueOuverte, setModalMarqueOuverte] = useState(false);
  const [modalUtilisateurOuverte, setModalUtilisateurOuverte] = useState(false);

  const [nouvelleCategorie, setNouvelleCategorie] = useState("");
  const [nouvelleSousCategorie, setNouvelleSousCategorie] = useState("");
  const [nouvelleMarque, setNouvelleMarque] = useState("");
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState("");

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

    // Nombres (haut de page)
    var nbArticles = 0;
    db.collection("articles")
      .get()
      .then((querySnapshot) => {
        nbArticles = querySnapshot.size;
        setNbTotalArticles(nbArticles);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant la taille de la collection (Ajouter.js > useEffect() > nbArticles) : ",
          error
        );
      });

    var nbCategories = 0;
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        nbCategories = querySnapshot.size;
        setNbTotalCategories(nbCategories);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant la taille de la collection (Ajouter.js > useEffect() > nbCategories) : ",
          error
        );
      });

    var nbSousCategories = 0;
    db.collection("sousCategories")
      .get()
      .then((querySnapshot) => {
        nbSousCategories = querySnapshot.size;
        setNbTotalSousCategories(nbSousCategories);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant la taille de la collection (Ajouter.js > useEffect() > nbSousCategories) : ",
          error
        );
      });

    var nbMarques = 0;
    db.collection("marques")
      .get()
      .then((querySnapshot) => {
        nbMarques = querySnapshot.size;
        setNbTotalMarques(nbMarques);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant la taille de la collection (Ajouter.js > useEffect() > nbArticles) : ",
          error
        );
      });

    var nbUtilisateurs = 0;
    db.collection("utilisateurs")
      .get()
      .then((querySnapshot) => {
        nbUtilisateurs = querySnapshot.size;
        setNbTotalUtilisateurs(nbUtilisateurs);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant la taille de la collection (Ajouter.js > useEffect() > nbUtilisateurs) : ",
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
        setCategories(toutesLesCategories);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Ajouter.js > useEffect() > categories) : ",
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
            idSousCategorie: doc.data().idSousCategorie,
            stocks: doc.data().stocks,
            stocksMini: doc.data().stocksMini,
          });
        });
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Ajouter.js > useEffect() > articles) : ",
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
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Ajouter.js > useEffect() > sousCategories) : ",
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
        setMarques(toutesLesMarques);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Ajouter.js > useEffect() > marques) : ",
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
        setUtilisateurs(tousLesUtilisateurs);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Ajouter.js > useEffect() > utilisateurs) : ",
          error
        );
      });
  }, [nbRefresh]);

  function renderStats() {
    return (
      <View
        style={{
          width: "100%",
          height: 110,
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
              marginVertical: SIZES.base,
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h15,
                  fontWeight: "bold",
                }}
              >
                {nbTotalArticles}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
                articles
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.lightGray,
                  ...FONTS.h15,
                  fontWeight: "bold",
                }}
              >
                {nbTotalCategories}
              </Text>
              <Text style={{ color: COLORS.lightGray, ...FONTS.body5 }}>
                catégories
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h15,
                  fontWeight: "bold",
                }}
              >
                {nbTotalSousCategories}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
                Sous-catégories
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.lightGray,
                  ...FONTS.h15,
                  fontWeight: "bold",
                }}
              >
                {nbTotalMarques}
              </Text>
              <Text style={{ color: COLORS.lightGray, ...FONTS.body5 }}>
                marques
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h15,
                  fontWeight: "bold",
                }}
              >
                {nbTotalUtilisateurs}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
                utilisateurs
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderAjouterArticle() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding / 2,
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
        onPress={() => navigation.navigate("FicheArticle", { nouveau: true })}
      >
        <Image
          source={icons.article}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.yellow,
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
            Ajouter un article
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>
            Vous pourrez ensuite le modifier ou le supprimer depuis sa fiche
            article
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

  function renderModifierDonnees({ donnees, logo, nom }) {
    const renderEnTete = () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: SIZES.base,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={logo}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.yellow,
            }}
          />
          <Text
            style={{ marginLeft: SIZES.base, ...FONTS.h2, fontWeight: "bold" }}
          >
            {nom}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (nom === "Catégories") {
              setModalCategorieOuverte(true);
            } else if (nom === "Sous-catégories") {
              setModalSousCategorieOuverte(true);
            } else if (nom === "Marques") {
              setModalMarqueOuverte(true);
            } else if (nom === "Utilisateurs") {
              setModalUtilisateurOuverte(true);
            }
          }}
        >
          <Image
            source={icons.ajouter}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.green,
            }}
          />
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({ item }) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.base / 3,
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
            placeholder="Nom de la donnée"
            placeholderTextColor={COLORS.gray}
            value={item.nom}
            onChangeText={(texte) => console.log(texte)}
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
              if (nom === "Catégories") {
                firebase
                  .firestore()
                  .collection("categories")
                  .doc(item.id)
                  .update({
                    nom: "",
                  });

                var toutesLesCategories = myArray.map(
                  (value, index) => index + ": " + value
                );
              } else if (nom === "Sous-catégories") {
                firebase
                  .firestore()
                  .collection("sousCategories")
                  .doc(item.id)
                  .update({
                    nom: "",
                  });
              } else if (nom === "Marques") {
                firebase.firestore().collection("marques").doc(item.id).update({
                  nom: "",
                });
              } else if (nom === "Utilisateurs") {
                firebase
                  .firestore()
                  .collection("utilisateurs")
                  .doc(item.id)
                  .update({
                    nom: "",
                  });
              }
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

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: SIZES.base,
            marginRight: SIZES.base,
          }}
          onPress={() => {
            Alert.alert(
              "Confirmation",
              "Souhaitez-vous supprimer définitivement cette donnée ?",
              [
                {
                  text: "Annuler",
                  onPress: () => console.log("Annulé"),
                  style: "cancel",
                },
                {
                  text: "Confirmer",
                  onPress: () => {
                    if (nom === "Catégories") {
                      firebase
                        .firestore()
                        .collection("categories")
                        .doc(item.id)
                        .delete();
                    } else if (nom === "Sous-catégories") {
                      firebase
                        .firestore()
                        .collection("sousCategories")
                        .doc(item.id)
                        .delete();
                    } else if (nom === "Marques") {
                      firebase
                        .firestore()
                        .collection("marques")
                        .doc(item.id)
                        .delete();
                    } else if (nom === "Utilisateurs") {
                      firebase
                        .firestore()
                        .collection("utilisateurs")
                        .doc(item.id)
                        .delete();
                    }
                    setNbRefresh(nbRefresh + 1);
                  },
                },
              ]
            );
          }}
        >
          <Image
            source={icons.suppression}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.red,
            }}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <View
        style={{
          height: 350,
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {renderEnTete()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <FlatList
            contentContainerStyle={{ marginTop: SIZES.radius }}
            scrollEnabled={false}
            data={donnees}
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
      </View>
    );
  }

  function renderModal({ visible, nom }) {
    return (
      <Modal
        visible={visible}
        transparent
        hardwareAccelerated
        onRequestClose={() => {
          if (nom === "Catégorie") {
            setModalCategorieOuverte(false);
          } else if (nom === "Sous-catégorie") {
            setModalSousCategorieOuverte(false);
          } else if (nom === "Marque") {
            setModalMarqueOuverte(false);
          } else if (nom === "Utilisateur") {
            setModalUtilisateurOuverte(false);
          }
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black + "99",
          }}
        >
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...FONTS.h15,
                marginTop: SIZES.padding / 2,
                marginLeft: SIZES.padding,
              }}
            >
              {nom}
            </Text>

            <View style={{ alignItems: "center" }}>
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
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                }}
              >
                <TextInput
                  placeholder="Nom de la donnée"
                  placeholderTextColor={COLORS.gray}
                  value={
                    nom === "Catégorie"
                      ? nouvelleCategorie
                      : nom === "Sous-catégorie"
                      ? nouvelleSousCategorie
                      : nom === "Marque"
                      ? nouvelleMarque
                      : nouvelUtilisateur
                  }
                  onChangeText={(texte) => {
                    if (nom === "Catégorie") {
                      setNouvelleCategorie(texte);
                    } else if (nom === "Sous-catégorie") {
                      setNouvelleSousCategorie(texte);
                    } else if (nom === "Marque") {
                      setNouvelleMarque(texte);
                    } else if (nom === "Utilisateur") {
                      setNouvelUtilisateur(texte);
                    }
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
                    if (nom === "Catégorie") {
                      setNouvelleCategorie("");
                    } else if (nom === "Sous-catégorie") {
                      setNouvelleSousCategorie("");
                    } else if (nom === "Marque") {
                      setNouvelleMarque("");
                    } else if (nom === "Utilisateur") {
                      setNouvelUtilisateur("");
                    }
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: SIZES.padding,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (nom === "Catégorie") {
                    setModalCategorieOuverte(false);
                    setNouvelleCategorie("");
                  } else if (nom === "Sous-catégorie") {
                    setModalSousCategorieOuverte(false);
                    setNouvelleSousCategorie("");
                  } else if (nom === "Marque") {
                    setModalMarqueOuverte(false);
                    setNouvelleMarque("");
                  } else if (nom === "Utilisateur") {
                    setModalUtilisateurOuverte(false);
                    setNouvelUtilisateur("");
                  }
                }}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.gray }}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (nom === "Catégorie") {
                    setModalCategorieOuverte(false);
                    setNouvelleCategorie("");
                    firebase.firestore().collection("categories").add({
                      nom: nouvelleCategorie,
                    });
                  } else if (nom === "Sous-catégorie") {
                    setModalSousCategorieOuverte(false);
                    setNouvelleSousCategorie("");
                    firebase.firestore().collection("sousCategories").add({
                      nom: nouvelleSousCategorie,
                    });
                  } else if (nom === "Marque") {
                    setModalMarqueOuverte(false);
                    setNouvelleMarque("");
                    firebase.firestore().collection("marques").add({
                      nom: nouvelleMarque,
                    });
                  } else if (nom === "Utilisateur") {
                    setModalUtilisateurOuverte(false);
                    setNouvelUtilisateur("");
                    firebase.firestore().collection("utilisateurs").add({
                      nom: nouvelUtilisateur,
                    });
                  }
                  setNbRefresh(nbRefresh + 1);
                }}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                  Enregistrer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 90 }}>
      {renderModal({ visible: modalCategorieOuverte, nom: "Catégorie" })}
      {renderModal({
        visible: modalSousCategorieOuverte,
        nom: "Sous-catégorie",
      })}
      {renderModal({ visible: modalMarqueOuverte, nom: "Marque" })}
      {renderModal({ visible: modalUtilisateurOuverte, nom: "Utilisateur" })}

      {renderStats()}

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderAjouterArticle()}

        {renderModifierDonnees({
          donnees: categories,
          logo: icons.categories,
          nom: "Catégories",
        })}
        {renderModifierDonnees({
          donnees: sousCategories,
          logo: icons.sousCategories,
          nom: "Sous-catégories",
        })}
        {renderModifierDonnees({
          donnees: marques,
          logo: icons.marques,
          nom: "Marques",
        })}
        {renderModifierDonnees({
          donnees: utilisateurs,
          logo: icons.utilisateurs,
          nom: "Utilisateurs",
        })}
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

export default Ajouter;
