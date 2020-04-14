import React, { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function Details({ route }) {
  const {
    data,
    id,
    linkdoobrazka,
    marka,
    rodzajPaliwa,
    spalanienaSto
  } = route.params;

  var _data = new Date(data);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: linkdoobrazka }} />
      <Text style={styles.text}>Marka auta: {marka}</Text>
      <Text style={styles.text}>Rodzaj paliwa: {rodzajPaliwa}</Text>
      <Text style={styles.text}>
        Spalanie auta: {Number(spalanienaSto).toFixed(2)} L / 100 km
      </Text>
      <Text style={styles.text}>
        Data: {_data.getDate()}.{_data.getMonth() + 1}.{_data.getFullYear()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#eee"
  },
  text: {
    padding: 5,
    marginTop: 10,
    textAlign: "justify",
    fontSize: 17
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center"
  }
});
