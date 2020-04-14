import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  Keyboard,
  Picker
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export default function AddData({ navigation }) {
  const [marka, setMarka] = useState("");
  const [linkDoObrazka, setLinkDoObrazka] = useState("");
  const [rodzajPaliwa, setRodzajPaliwa] = useState("Diesel");
  const [spalanie, setSpalanie] = useState(0);
  const [kilometry, setKilometry] = useState(0);
  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  function oblicz() {
    if (checkIfInputIsANumberAndIsNotEmpty(spalanie) == false) {
      ToastAndroid.show(
        "Spalanie musi być liczbą i nie być puste",
        ToastAndroid.SHORT
      );
      return;
    }
    if (checkIfInputIsANumberAndIsNotEmpty(kilometry) == false) {
      ToastAndroid.show(
        "Kilometry muszą być liczbą i nie być puste",
        ToastAndroid.SHORT
      );
      return;
    }
    if (rodzajPaliwa == "") {
      ToastAndroid.show("Rodzaj paliwa nie może być pusty", ToastAndroid.SHORT);
      return;
    }

    const spalanieNa100 = (spalanie / kilometry) * 100;

    db.transaction(tx => {
      tx.executeSql(
        "insert into items (marka, linkdoobrazka, data, spalanienaSto, rodzajPaliwa ) values (?,?,?,?,?)",
        [marka, linkDoObrazka, date.toString(), spalanieNa100, rodzajPaliwa],
        () => console.log("insert ok"),
        (a, b) => {
          console.log(a);
          console.log(b);
        }
      );
    });

    navigation.navigate("Home");
  }

  function checkIfInputIsANumberAndIsNotEmpty(input) {
    if (isNaN(input)) return false;
    if (input == "") return false;
    return true;
  }

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    // <TouchableWithoutFeedback onPress={() => {
    //     Keyboard.dismiss();
    // }}>
    <View style={styles.container}>
      <Text style={styles.text}>Wpisz markę auta</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setMarka(text)}
      />

      <Text style={styles.text}>Wpisz link do obrazka</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setLinkDoObrazka(text)}
      />

      <Text style={styles.text}>Ile litrów paliwa spaliło auto:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={text => setSpalanie(text)}
      />

      <Text style={styles.text}>Ile kilometrów przejechało auto:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={text => setKilometry(text)}
      />

      <Text style={styles.text}>Rodzaj paliwa:</Text>
      <Picker
        selectedValue={rodzajPaliwa}
        // style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue);
          console.log(itemIndex);
          setRodzajPaliwa(itemValue);
        }}
      >
        <Picker.Item label="Diesel" value="Diesel" />
        <Picker.Item label="Benzyna" value="Benzyna" />
        <Picker.Item label="LPG" value="LPG" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={() => showDatepicker()}>
        <Text style={styles.buttonText}>Wprowadź datę</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => oblicz()}>
        <Text style={styles.buttonText}>Oblicz i dodaj</Text>
      </TouchableOpacity>
    </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 0,
    flex: 1,
    backgroundColor: "#eee"
  },
  textInput: {
    borderWidth: 1,
    paddingLeft: 20,
    height: 40,
    borderColor: "gray",
    color: "black",
    borderRadius: 10,
    borderStyle: "dashed",
    backgroundColor: "#fff"
  },
  text: {
    padding: 5,
    marginTop: 15
  },
  button: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#aeaeae",
    padding: 10,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  }
});
