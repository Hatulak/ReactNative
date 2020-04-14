import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function DriverStandingsDetailsView({ navigation, route }) {
  const driver = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.driver}>
            {driver.givenName} {driver.familyName}
          </Text>
          <Text style={styles.nationality}>
            {" "}(ur. {driver.dateOfBirth} {driver.nationality})
          </Text>
        </View>
      <WebView source={{ uri: driver.url }} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    margin: 2,
    flex: 1,
  },
  driver: {
    fontWeight: "bold",
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 15,
  },
  nationality: {
    fontSize: 11,
    marginTop: 3,
  },
  body: {},
  tekst: {
    padding: 3,
  },
});
