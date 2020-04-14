import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";

export default function SearchView({ navigation }) {
  const [areSeasonsLoaded, setAreSeasonsLoaded] = useState(false);
  const [seasonsList, setSeasonsList] = useState([]);
  const [pickedSeason, setPickedSeason] = useState(1950);
  const [roundsList, setRoundsList] = useState([]);
  const [pickedRound, setPickedRound] = useState(1);

  if (!areSeasonsLoaded) {
    fetch("https://ergast.com/api/f1/seasons.json?limit=1000")
      .then((response) => response.json())
      .then((json) => {
        setSeasonsList(json.MRData.SeasonTable.Seasons);
        setAreSeasonsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setAreSeasonsLoaded(false);
      });
  }

  function loadRounds(pickedSeason) {
    fetch("https://ergast.com/api/f1/" + pickedSeason + ".json")
      .then((response) => response.json())
      .then((json) => {
        setRoundsList(json.MRData.RaceTable.Races);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showResults() {
    var results;
    var raceName;
    var circuit;
    fetch(
      "https://ergast.com/api/f1/" +
        pickedSeason +
        "/" +
        pickedRound +
        "/results.json"
    )
      .then((response) => response.json())
      .then((json) => {
        results = json.MRData.RaceTable.Races[0].Results;
        raceName = json.MRData.RaceTable.Races[0].raceName;
        circuit = json.MRData.RaceTable.Races[0].Circuit;
        console.log(circuit);
        navigation.navigate("ResultView", {
          pickedSeason,
          pickedRound,
          results,
          raceName,
          circuit,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showDriverStandings() {
    var driverStandings;
    fetch(
      "https://ergast.com/api/f1/" +
        pickedSeason +
        "/" +
        pickedRound +
        "/driverStandings.json"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        driverStandings =
          json.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        navigation.navigate("DriverStandingsView", {
          pickedSeason,
          pickedRound,
          driverStandings,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showDrivers() {
    var drivers;
    fetch(
      "https://ergast.com/api/f1/" +
        pickedSeason +
        "/" +
        pickedRound +
        "/drivers.json"
    )
      .then((response) => response.json())
      .then((json) => {
        drivers = json.MRData.DriverTable.Drivers;

        navigation.navigate("DriversView", {
          pickedSeason,
          pickedRound,
          drivers,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Wybierz sezon:</Text>
      <Picker
        selectedValue={pickedSeason}
        onValueChange={(itemValue, itemIndex) => {
          setPickedSeason(itemValue);
          loadRounds(itemValue);
        }}
      >
        {seasonsList.map((item, index) => {
          return (
            <Picker.Item label={item.season} value={item.season} key={index} />
          );
        })}
      </Picker>

      <Text>Wybierz rundę:</Text>
      <Picker
        selectedValue={pickedRound}
        onValueChange={(itemValue, itemIndex) => {
          setPickedRound(itemValue);
        }}
      >
        {roundsList.map((item, index) => {
          return (
            <Picker.Item
              label={item.round + " - " + item.raceName}
              value={item.round}
              key={index}
            />
          );
        })}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={() => showResults()}>
        <Text style={styles.buttonText}>Wyniki wyścigu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => showDriverStandings()}
      >
        <Text style={styles.buttonText}>Klasyfikacja generalna</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => showDrivers()}>
        <Text style={styles.buttonText}>Kierowcy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 50,
    paddingTop: 20,
  },
  button: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#aeaeae",
    padding: 10,
    alignItems: "center",
  },
});
