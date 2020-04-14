import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddData from './components/AddData';
import Home from './components/Home';
import Details from './components/Details';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCjKx2lwTMULS21NFrsigfN02E9lNHlhxE",
  authDomain: "apkadb-d1be3.firebaseapp.com",
  databaseURL: "https://apkadb-d1be3.firebaseio.com",
  projectId: "apkadb-d1be3",
  storageBucket: "apkadb-d1be3.appspot.com",
  messagingSenderId: "1003709286882",
  appId: "1:1003709286882:web:6a33c2eeb388f9396991bb"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();

export default function App() {
  // var firebase = require("firebase");
  
  // db.transaction(tx =>{
  //   tx.executeSql(
  //     'drop table if exists items;',
  //     null,
  //     ()=>{console.log('db deleted')},
  //     ()=>{console.log('db del error')}
  //   );
  // })
  // db.transaction(tx =>{
  //   tx.executeSql(
  //     'create table if not exists items (id integer primary key autoincrement, marka text, linkdoobrazka text, data text, spalanienaSto real, rodzajPaliwa text);',
  //     null,
  //     ()=>{console.log('db created or updated')},
  //     ()=>{console.log('db error')}
  //   );
  // })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Baza samochodów'}}
        />
        <Stack.Screen
          name="AddData"
          component={AddData}
          options={{ title: 'Baza samochodów' }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{title: 'Szczegóły'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
