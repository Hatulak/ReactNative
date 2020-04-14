import React, { useState } from "react";
import { StyleSheet, Text, View,  TouchableOpacity } from "react-native";


export default function DriverRowItem({ navigation, driver }) {
  function navigateToDetails() {
    navigation.navigate("DriverDetailsView", driver);
  }

  return (
    <TouchableOpacity onPress={() => navigateToDetails()}>
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.driver}>
            {driver.givenName}
            {" " + driver.familyName}
          </Text>
          <Text>Pochodzenie: {driver.nationality}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    flexDirection: "row",
    flex: 1,
  },
  position: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#182880",
  },
  rightContainer: {
    marginLeft: 5,
  },
  driver: {
    fontWeight: "bold",
  },
});
