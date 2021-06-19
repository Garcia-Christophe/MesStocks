import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import { COLORS, SIZES, FONTS, icons } from "../constants";

const BarreRetour = ({ right, idArticle, nomArticle, color }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        flexDirection: "row",
        marginTop: SIZES.padding * 2,
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.retour}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: color === COLORS.white ? COLORS.white : COLORS.gray,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              ...FONTS.h2,
              fontWeight: "bold",
              color: color === COLORS.white ? COLORS.white : COLORS.black,
            }}
          >
            Retour
          </Text>
        </TouchableOpacity>
      </View>

      {right && (
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Confirmation",
                "Souhaitez-vous supprimer définitivement cet article ?",
                [
                  {
                    text: "Annuler",
                    onPress: () => console.log("Annulé"),
                    style: "cancel",
                  },
                  {
                    text: "Confirmer",
                    onPress: () => {
                      firebase
                        .firestore()
                        .collection("articles")
                        .doc(idArticle)
                        .delete();

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
                          nomObjet: nomArticle,
                          objet: "A",
                          type: "S",
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

                      console.log("Confirmé");
                      navigation.goBack();
                    },
                  },
                ]
              );
            }}
          >
            <Image
              source={icons.suppression}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.red,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BarreRetour;
