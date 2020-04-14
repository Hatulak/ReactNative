import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ItemRow from "./components/ItemRow";

export default function ResultView({ navigation, route }) {
  const {
    pickedSeason,
    pickedRound,
    results,
    raceName,
    circuit,
  } = route.params;

  function navigateToDetails() {
    navigation.navigate("CircuitDetailsView", circuit)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToDetails()}>
        <Text style={styles.text}>
          Sezon {pickedSeason}, runda {pickedRound}
        </Text>
        <Text style={styles.text}>
          {raceName}, tor {circuit.circuitName}
        </Text>
      </TouchableOpacity>
      <View style={styles.list}>
        <FlatList
          data={results}
          keyExtractor={(result) => result.Driver.driverId}
          renderItem={(result) => (
            <ItemRow navigation={navigation} result={result.item} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 20,
    paddingTop: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#aeaeae",
    padding: 10,
    alignItems: "center",
  },
  list: {
    flex: 1,
    padding: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 15,
  },
});
