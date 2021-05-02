import React from 'react';
import { Historique, FicheArticle, DerniersEvenements } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
/* componentWillMount dans une cons5
  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAeCXOrmoIp0mlumlHP4OXFLYGCBIRmCAc",
      authDomain: "messtocks-240379.firebaseapp.com",
      projectId: "messtocks-240379",
      storageBucket: "messtocks-240379.appspot.com",
      messagingSenderId: "1095956858761",
      appId: "1:1095956858761:web:873ab836cec0ceb6820358",
      measurementId: "G-JF80S725F6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }*/

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Récap'"}
      >
        <Stack.Screen
          name="Récap'"
          component={Tabs}
        />
        <Stack.Screen
          name="Rechercher"
          component={Tabs}
        />
        <Stack.Screen
          name="Scan"
          component={Tabs}
        />
        <Stack.Screen
          name="Ajouter"
          component={Tabs}
        />
        <Stack.Screen
          name="Params"
          component={Tabs}
        />
        <Stack.Screen
          name="Historique"
          component={Historique}
        />
        <Stack.Screen
          name="FicheArticle"
          component={FicheArticle}
        />
        <Stack.Screen
          name="DerniersEvenements"
          component={DerniersEvenements}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;