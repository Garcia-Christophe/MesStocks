import React from 'react';
import { Historique, FicheProduit } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
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
          name="FicheProduit"
          component={FicheProduit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;