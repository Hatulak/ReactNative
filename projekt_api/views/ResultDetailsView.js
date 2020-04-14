import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ResultDetalisView({ navigation, route }) {
  const result = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.position}>#{result.position}</Text>
        <View>
          <Text style={styles.driver}>
            {result.Driver.givenName} {result.Driver.familyName} (
            {"No " + result.number})
          </Text>
          <Text style={styles.nationality}>
            {" "}
            (ur. {result.Driver.dateOfBirth} {result.Driver.nationality})
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.tekst}>
          {result.Time == undefined
            ? "Czas: Nie ukończył\nStatus: " + result.status
            : "Czas: " + result.Time.time + "\nStatus: " + result.status}
        </Text>
        <Text style={styles.tekst}>Przejechane okrążenia: {result.laps}</Text>
        <Text style={styles.tekst}>Pozycja startowa : {result.grid}</Text>
        <Text style={styles.tekst}>Zebrane punkty : {result.points}</Text>
        <Text style={styles.tekst}>
          Konstruktor: {result.Constructor.name} (
          {result.Constructor.nationality})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#aeaeae",
    padding: 10,
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    margin: 2,
    flex: 1,
    padding: 10,
  },
  position: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
  rightContainer: {
    marginLeft: 5,
  },
  driver: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 17,
  },
  header: {
    flexDirection: "row",
  },
  nationality: {
    fontSize: 12,
  },
  body: {},
  tekst: {
    padding: 3,
  },
});
