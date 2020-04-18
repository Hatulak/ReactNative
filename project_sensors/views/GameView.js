import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Accelerometer } from "expo-sensors";
export const PILKA = require("../assets/pilka.png");
// type 0 - start, 1 - zielone, 2- czerwone(zabronione), 3- meta
var map1 = [
  { id: 0, type: 0, current: 1 },
  { id: 1, type: 1, current: 0 },
  { id: 2, type: 1, current: 0 },
  { id: 3, type: 1, current: 0 },
  { id: 4, type: 1, current: 0 },
  { id: 5, type: 2, current: 0 },
  { id: 6, type: 2, current: 0 },
  { id: 7, type: 2, current: 0 },
  { id: 8, type: 2, current: 0 },
  { id: 9, type: 1, current: 0 },
  { id: 10, type: 2, current: 0 },
  { id: 11, type: 1, current: 0 },
  { id: 12, type: 1, current: 0 },
  { id: 13, type: 1, current: 0 },
  { id: 14, type: 1, current: 0 },
  { id: 15, type: 2, current: 0 },
  { id: 16, type: 1, current: 0 },
  { id: 17, type: 2, current: 0 },
  { id: 18, type: 2, current: 0 },
  { id: 19, type: 2, current: 0 },
  { id: 20, type: 2, current: 0 },
  { id: 21, type: 1, current: 0 },
  { id: 22, type: 1, current: 0 },
  { id: 23, type: 1, current: 0 },
  { id: 24, type: 1, current: 0 },
  { id: 25, type: 2, current: 0 },
  { id: 26, type: 2, current: 0 },
  { id: 27, type: 2, current: 0 },
  { id: 28, type: 2, current: 0 },
  { id: 29, type: 3, current: 0 },
];

const BALL_SIZE = 50; // the ball's radius
const TILE_HEIGTH = (Dimensions.get("window").height + 6) / 7;
const TILE_WIDTH = (Dimensions.get("window").width - 10) / 5;
const WINDOW_HEIGTH = ((Dimensions.get("window").height + 6) / 7) * 6;
const WINDOW_WIDTH = Dimensions.get("window").width - 25;
Accelerometer.setUpdateInterval(50);
const START_POS_X = 25;
const START_POS_Y = 30;

var posX = 25;
var posY = 30;
var alertPresent = false;
export default function GameView({ navigation }) {
  const [position, setPosition] = useState({
    x: START_POS_X,
    y: START_POS_Y,
  });
  const [subscribed, setSubscribed] = useState(false);
  // const [alertPresent, setAlertPresent] = useState(false);

  function chooseBackgroudColor(item) {
    if (item.current == 1) return "yellow";
    else if (item.type == 0) return "blue";
    else if (item.type == 1) return "green";
    else if (item.type == 2) return "red";
    else if (item.type == 3) return "cyan";
  }

  function restart() {
    alertPresent = false;
    // setAlertPresent(false);
    setSubscribed(true);
    let sx = parseInt((posX + BALL_SIZE / 2) / TILE_WIDTH);
    let sy = parseInt((posY + BALL_SIZE / 2) / TILE_HEIGTH);
    map1 = map1.map((item, index) => {
      if (parseInt(item.id) === parseInt(sx + 5 * sy))
        return { id: item.id, type: item.type, current: 1 };
      else return { id: item.id, type: item.type, current: 0 };
    });
    posX = 25;
    posY = 30;
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      let { x, y, z } = accelerometerData;
      posX -= 10 * x;
      posY += 10 * y;

      if (posX < 0) posX = 0;
      else if (posX > WINDOW_WIDTH - 25) posX = WINDOW_WIDTH - 25;
      if (posY < 0) posY = 0;
      else if (posX > WINDOW_HEIGTH - 25) posY = WINDOW_HEIGTH - 25;
      let s_x = parseInt((posX + BALL_SIZE / 2) / TILE_WIDTH);
      let s_y = parseInt((posY + BALL_SIZE / 2) / TILE_HEIGTH);

      map1 = map1.map((item, index) => {
        if (parseInt(item.id) === parseInt(s_x + 5 * s_y))
          return { id: item.id, type: item.type, current: 1 };
        else return { id: item.id, type: item.type, current: 0 };
      });

      setPosition({
        x: posX,
        y: posY,
      });
    });
  }

  function pilka() {
    return (
      <Image
        source={PILKA}
        style={{
          position: "absolute",
          height: BALL_SIZE,
          width: BALL_SIZE,
          top: posY,
          left: posX,
        }}
      />
    );
  }
  if (subscribed) {
    current = map1.find((obj) => obj.current === 1);
    if (current.type === 3) {
      this._subscription && this._subscription.remove();
      this._subscription = null;
      if (alertPresent === false) {
        alertPresent = true;
        // setAlertPresent(true);
        Alert.alert(
          "Gratulacje",
          "Przeszedłeś labirynt",
          [{ text: "OK", onPress: () => {}, style: "cancel" }],
          { cancelable: false }
        );

      }
      setSubscribed(false);
      return <View style={styles.MainContainer}></View>;
    } else if (current.type === 2) {
      this._subscription && this._subscription.remove();
      this._subscription = null;
      if (alertPresent === false) {
        alertPresent = true;
        // setAlertPresent(true);
        Alert.alert(
          "Porażka",
          ":(",
          [{ text: "OK", onPress: () => {}, style: "cancel" }],
          { cancelable: false }
        );
      }
      setSubscribed(false);
      return <View style={styles.MainContainer}></View>;
    } else {
      return (
        <View style={styles.MainContainer}>
          <FlatList
            data={map1}
            renderItem={({ item }) => (
              <View
                style={{
                  //   flex: 1,
                  flexDirection: "column",
                  margin: 1,
                  height: TILE_HEIGTH,
                  width: TILE_WIDTH,
                  backgroundColor: chooseBackgroudColor(item),
                }}
              ></View>
            )}
            //Setting the number of column
            numColumns={5}
            keyExtractor={(item, index) => index.toString()}
          />
          {pilka()}
        </View>
      );
    }
  } else
  restart();
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity style={styles.button} onPress={() => restart()}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: TILE_HEIGTH,
    width: TILE_WIDTH,
  },
  button: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#aeaeae",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
