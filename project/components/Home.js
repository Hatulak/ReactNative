import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import * as SQLite from "expo-sqlite";
import { FlatList } from "react-native-gesture-handler";
import ItemRow from "./ItemRow";

const db = SQLite.openDatabase("db.db");

export default function Home({ navigation }) {
  const [items, setItems] = useState(null);
  db.transaction(tx => {
    tx.executeSql("select * from items", null, (_, { rows: { _array } }) =>
      setItems(_array)
    );
  });

  function navigateToAddData() {
    navigation.navigate("AddData");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToAddData()}
      >
        <Text style={styles.buttonText}>Dodaj nowy wynik</Text>
      </TouchableOpacity>
      <View style={styles.list}>
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ItemRow
              navigation = {navigation}
              item={item}
              onLongPress={()=> deleteItemById(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
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
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#aeaeae",
    padding: 10,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  list: {
    flex: 1
  }
});
