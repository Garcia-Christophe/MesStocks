import React, { useEffect } from "react";
import { Historique, FicheArticle, DerniersEvenements } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyBfRGYAMrZnSYhkQN-YeZa1kcTq71_H5xQ",
      authDomain: "messtocks-17fee.firebaseapp.com",
      projectId: "messtocks-17fee",
      storageBucket: "messtocks-17fee.appspot.com",
      messagingSenderId: "772139915219",
      appId: "1:772139915219:web:3d6720ecd5ed424b648126",
      measurementId: "G-91GK8TDNTB",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();

    firebase.firestore().collection("marques").add({
      nom: "Decoute",
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Récap'"}
      >
        <Stack.Screen name="Récap'" component={Tabs} />
        <Stack.Screen name="Rechercher" component={Tabs} />
        <Stack.Screen name="Scan" component={Tabs} />
        <Stack.Screen name="Ajouter" component={Tabs} />
        <Stack.Screen name="Params" component={Tabs} />
        <Stack.Screen name="Historique" component={Historique} />
        <Stack.Screen name="FicheArticle" component={FicheArticle} />
        <Stack.Screen
          name="DerniersEvenements"
          component={DerniersEvenements}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
