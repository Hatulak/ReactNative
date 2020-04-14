import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";



export default function DriverStandingsRowItem({ navigation, driverStanding }) {

  function navigateToDetails(){
    navigation.navigate("DriverStandingsDetailsView", driverStanding);
  }

  function positionStyle(options) {
    if (driverStanding.position == "1") {
      return {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFD700",
      };
    } else if (driverStanding.position == "2") {
      return {
        fontSize: 30,
        fontWeight: "bold",
        color: "#C0C0C0",
      };
    } else if (driverStanding.position == "3") {
      return {
        fontSize: 30,
        fontWeight: "bold",
        color: "#965A38",
      };
    } else {
      return {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
      };
    }
  };

  return (
    <TouchableOpacity onPress={() => navigateToDetails()}>
      <View style={styles.container}>
        <Text style={positionStyle()}>#{driverStanding.position}</Text>

        <View style={styles.rightContainer}>
          <Text style={styles.driver}>
            {driverStanding.Driver.givenName}
            {" " + driverStanding.Driver.familyName}
          </Text>
          <Text>
            Punkty: {driverStanding.points}
          </Text>
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
