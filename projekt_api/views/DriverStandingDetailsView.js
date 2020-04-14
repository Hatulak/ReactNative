import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";

export default function DriverStandingsDetailsView({ navigation, route }) {
  const driverStanding = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.position}>#{driverStanding.position}</Text>
        <View>
          <Text style={styles.driver}>
            {driverStanding.Driver.givenName} {driverStanding.Driver.familyName}
          </Text>
          <Text style={styles.nationality}>
            {" "}
            (ur. {driverStanding.Driver.dateOfBirth} {driverStanding.Driver.nationality})
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.tekst}>Punkty : {driverStanding.points}</Text>
        <Text style={styles.tekst}>Wygrane : {driverStanding.wins}</Text>
        <Text style={styles.tekst}>
          Konstruktor: {driverStanding.Constructors[0].name} (
          {driverStanding.Constructors[0].nationality})
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
