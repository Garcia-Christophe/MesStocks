import React from "react";
import { Historique, FicheArticle, DerniersEvenements } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./tabs";

const Stack = createStackNavigator();

function MainStackNavigator() {
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
}

export default MainStackNavigator;
