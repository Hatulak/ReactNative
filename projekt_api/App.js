import React, { useState } from "react";
import { StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchView from "./views/SearchView";
import ResultView from "./views/ResultView";
import ResultDetailsView from "./views/ResultDetailsView";
import DriverStandingsView from "./views/DriverStandingsView";
import DriverStandingsDetailsView from "./views/DriverStandingDetailsView";
import DriversView from "./views/DriversView";
import DriverDetailsView from "./views/DriverDetailsView";
import CircuitDetailsView from "./views/CircuitDetailsView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchView"
          component={SearchView}
          options={{ title: "Wyszukiwanie" }}
        />
        <Stack.Screen
          name="ResultView"
          component={ResultView}
          options={{ title: "Wynik wyszukiwania" }}
        />
        <Stack.Screen
          name="ResultDetailsView"
          component={ResultDetailsView}
          options={{ title: "Szczegóły wyniku" }}
        />
        <Stack.Screen
          name="DriverStandingsView"
          component={DriverStandingsView}
          options={{ title: "Klasyfikacja" }}
        />
        <Stack.Screen
          name="DriverStandingsDetailsView"
          component={DriverStandingsDetailsView}
          options={{ title: "Szczegóły" }}
        />
        <Stack.Screen
          name="DriversView"
          component={DriversView}
          options={{ title: "Kierowcy" }}
        />
        <Stack.Screen
          name="DriverDetailsView"
          component={DriverDetailsView}
          options={{ title: "Szczegóły kierowcy" }}
        />
        <Stack.Screen
          name="CircuitDetailsView"
          component={CircuitDetailsView}
          options={{ title: "Szczegóły toru" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
