import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Animated,
} from "react-native";
import firebase from "firebase";

import {
  BarreRetour,
  HistoriqueEntreesSorties,
  BoutonTexte,
} from "../components";
import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";

const Historique = ({ route, navigation }) => {
  const [nbRefresh, setNbRefresh] = useState(0); // Incrémenté de 1 pour forcer le useEffect (re-render)
  const [nbEntrees, setNbEntrees] = useState(0);
  const [nbSorties, setNbSorties] = useState(0);

  const scrollX = new Animated.Value(0);
  const nombreDeFiltres = [1, 2, 3];

  const [types, setTypes] = useState(dummyData.types);
  const [typeSelectionne, setTypeSelectionne] = useState(dummyData.types[0]);
  const [personnes, setPersonnes] = useState([]);
  const [personneSelectionnee, setPersonneSelectionnee] = useState({
    id: "0",
    nom: "Toutes",
  });
  const [periodes, setPeriodes] = useState(dummyData.periodes);
  const [periodeSelectionnee, setPeriodeSelectionnee] = useState(
    dummyData.periodes[0]
  );

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

    // Personnes
    var toutesLesPersonnes = [];
    toutesLesPersonnes.push({
      id: "0",
      nom: "Toutes",
    });
    db.collection("utilisateurs")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          toutesLesPersonnes.push({
            id: doc.id,
            nom: doc.data().nom,
          });
        });
        if (nbRefresh === 0) {
          setPersonnes(toutesLesPersonnes);
          setPersonneSelectionnee(toutesLesPersonnes[0]);
        }
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Historique.js > useEffect() > personnes) : ",
          error
        );
      });

    // Historique
    var historique = [];
    var entrees = 0;
    var sorties = 0;
    db.collection("historique")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (
            route != undefined &&
            route.params != undefined &&
            route.params.idArticle != undefined
          ) {
            if (route.params.idArticle === doc.data().idArticle) {
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
                nombre: doc.data().nombre,
                idUtilisateur: doc.data().idUtilisateur,
                nomUtilisateur: toutesLesPersonnes.filter(
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
            }
          } else {
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
              nombre: doc.data().nombre,
              idUtilisateur: doc.data().idUtilisateur,
              nomUtilisateur: toutesLesPersonnes.filter(
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
          }
        });

        // Trier l'historique suivant le filtre Type
        if (typeSelectionne.id !== 1) {
          historique = historique.filter(
            (ligne) =>
              (typeSelectionne.id === 2 && ligne.type === "E") ||
              (typeSelectionne.id === 3 && ligne.type === "S")
          );
        }

        // Trier l'historique suivant le filtre Personne
        if (personneSelectionnee.nom !== "Toutes") {
          historique = historique.filter(
            (ligne) => ligne.nomUtilisateur === personneSelectionnee.nom
          );
        }

        // Trier l'historique suivant le filtre Période
        var maintenant = new Date();
        if (periodeSelectionnee.id === 2) {
          historique = historique.filter(
            (ligne) =>
              ligne.date.getMonth() === maintenant.getMonth() &&
              ligne.date.getFullYear() === maintenant.getFullYear()
          );
        } else if (periodeSelectionnee.id === 3) {
          historique = historique.filter(
            (ligne) => ligne.date.getTime() > maintenant.getTime() - 604800000
          );
        } else if (periodeSelectionnee.id === 4) {
          historique = historique.filter(
            (ligne) =>
              ligne.date.getDate() === maintenant.getDate() &&
              ligne.date.getMonth() === maintenant.getMonth() &&
              ligne.date.getFullYear() === maintenant.getFullYear()
          );
        }

        historique.forEach((ligne) => {
          entrees += ligne.type === "E" ? ligne.nombre : 0;
          sorties += ligne.type === "S" ? ligne.nombre : 0;
        });

        setNbEntrees(entrees);
        setNbSorties(sorties);
      })
      .catch((error) => {
        console.log(
          "Erreur en récupérant le document (Recap.js > useEffect() > historiques) : ",
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

  function renderPetitsPoints() {
    const positionPoint = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 10, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {nombreDeFiltres.map((item, index) => {
            const opacity = positionPoint.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const taillePoint = positionPoint.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const couleurPoint = positionPoint.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`point-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: taillePoint,
                  height: taillePoint,
                  backgroundColor: couleurPoint,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderEntete() {
    return (
      <View
        style={{
          width: "100%",
          height: 150,
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
          <BarreRetour right={false} color={COLORS.white} />

          {/* Nombres entrées/sorties */}
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
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.green,
                  ...FONTS.h1,
                  paddingHorizontal: SIZES.padding,
                  paddingTop: SIZES.base,
                  fontWeight: "bold",
                }}
              >
                {nbEntrees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body5, top: -10 }}>
                entrées
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.h1,
                  paddingHorizontal: SIZES.padding,
                  paddingTop: SIZES.base,
                  fontWeight: "bold",
                }}
              >
                {nbSorties.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body5, top: -10 }}>
                sorties
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderFiltres() {
    return (
      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={SIZES.width - 40}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {nombreDeFiltres.map((item, index) => (
            <View
              key={`option-${index}`}
              style={{
                width: SIZES.width,
              }}
            >
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
                    source={
                      index === 0
                        ? icons.entree_sortie_disque
                        : index === 1
                        ? icons.qui
                        : icons.chrono
                    }
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
                    {index === 0 && "Type"}
                    {index === 1 && "Personne"}
                    {index === 2 && "Période"}
                  </Text>
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingVertical: SIZES.padding / 2,
                  }}
                >
                  {index === 0 &&
                    types.map((type) => {
                      return (
                        <BoutonTexte
                          key={`option-${type.id}`}
                          nom={type.nom}
                          customContainerStyle={{
                            height: 30,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 15,
                            backgroundColor:
                              typeSelectionne.id === type.id
                                ? COLORS.primary
                                : COLORS.lightGray,
                          }}
                          customLabelStyle={{
                            color:
                              typeSelectionne.id === type.id
                                ? COLORS.white
                                : COLORS.gray,
                          }}
                          myOnPress={() => {
                            setTypeSelectionne(type);
                            setNbRefresh(nbRefresh + 1);
                          }}
                        />
                      );
                    })}
                  {index === 1 &&
                    personnes.map((personne) => {
                      return (
                        <BoutonTexte
                          key={`option-${personne.id}`}
                          nom={personne.nom}
                          customContainerStyle={{
                            height: 30,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 15,
                            backgroundColor:
                              personneSelectionnee.id === personne.id
                                ? COLORS.primary
                                : COLORS.lightGray,
                          }}
                          customLabelStyle={{
                            color:
                              personneSelectionnee.id === personne.id
                                ? COLORS.white
                                : COLORS.gray,
                          }}
                          myOnPress={() => {
                            setPersonneSelectionnee(personne);
                            setNbRefresh(nbRefresh + 1);
                          }}
                        />
                      );
                    })}
                  {index === 2 &&
                    periodes.map((periode) => {
                      return (
                        <BoutonTexte
                          key={`option-${periode.id}`}
                          nom={periode.nom}
                          customContainerStyle={{
                            height: 30,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 15,
                            backgroundColor:
                              periodeSelectionnee.id === periode.id
                                ? COLORS.primary
                                : COLORS.lightGray,
                          }}
                          customLabelStyle={{
                            color:
                              periodeSelectionnee.id === periode.id
                                ? COLORS.white
                                : COLORS.gray,
                          }}
                          myOnPress={() => {
                            setPeriodeSelectionnee(periode);
                            setNbRefresh(nbRefresh + 1);
                          }}
                        />
                      );
                    })}
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {renderPetitsPoints()}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderEntete()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFiltres()}

        <HistoriqueEntreesSorties
          customContainerStyle={{
            ...styles.shadow,
            marginBottom: SIZES.padding,
            height:
              SIZES.height /* écran */ -
              150 /* banniere */ -
              SIZES.padding * 6 /* le reste */,
          }}
          navigation={navigation}
          idArticle={
            route != undefined &&
            route.params != undefined &&
            route.params.idArticle != undefined
              ? route.params.idArticle
              : -1
          }
          number={0}
          periodeFiltre={periodeSelectionnee}
          personneFiltre={personneSelectionnee}
          typeFiltre={typeSelectionne}
          nbRefresh={nbRefresh}
        />
      </ScrollView>
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

export default Historique;
