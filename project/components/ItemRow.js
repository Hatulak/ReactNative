import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export default function ItemRow({ item, navigation }) {
  var data = new Date(item.data);

  const navigateToDetails = () => {
    navigation.navigate("Details", item);
  };

  const deleteItemById = id => {

    Alert.alert(
      "Potwierdź",
      "Czy na pewno chcesz usunąć?",
      [
        { text: "Tak", onPress: () => deleteIt(id) },
        { text: "Nie", onPress: () => {}, style: "cancel" }
      ],
      { cancelable: false }
    );

  };

  const deleteIt = (id) =>{
    db.transaction(tx => {
      tx.executeSql(
        "delete from items where id = ?",
        [id],
        (a, b) => {
          console.log(a);
          console.log(b);
        },
        (a, b) => {
          console.log(a);
          console.log(b);
        }
      );
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigateToDetails()}
      onLongPress={() => deleteItemById(item.id)}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.linkdoobrazka }} />

        <View style={styles.textContainer}>
          <Text style={styles.text}>Nazwa: {item.marka}</Text>
          <Text style={styles.text}>
            Spalanie: {Number(item.spalanienaSto).toFixed(2)}L/100km
          </Text>
          <Text style={styles.text}>Rodzaj paliwa: {item.rodzajPaliwa}</Text>
          <Text style={styles.data}>
            Data: {data.getDate()}.{data.getMonth() + 1}.{data.getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    backgroundColor: "white"
  },
  text: {
    paddingLeft: 10,
    textAlign: "justify",
    fontSize: 17
  },
  data: {
    textAlign: "right",
    paddingRight: 10
  },
  image: {
    width: 100,
    height: 100
  },
  textContainer: {
    flex: 1
  }
});
