import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DriverRowItem from "./components/DriverRowItem";


export default function DriversView({ navigation, route }) {
  const { pickedSeason, pickedRound, drivers } = route.params;
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            Sezon {pickedSeason}, runda {pickedRound}
          </Text>
        <View style={styles.list}>
          <FlatList
            data={drivers}
            keyExtractor={(item) => item.driverId}
            renderItem={(item) => (
                <DriverRowItem navigation={navigation} driver={item.item} />
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
  text:{
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 15,
  }
});
