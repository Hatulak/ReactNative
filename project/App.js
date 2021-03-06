import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddData from './components/AddData';
import Home from './components/Home';
import Details from './components/Details';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const Stack = createStackNavigator();

export default function App() {
  // db.transaction(tx =>{
  //   tx.executeSql(
  //     'drop table if exists items;',
  //     null,
  //     ()=>{console.log('db deleted')},
  //     ()=>{console.log('db del error')}
  //   );
  // })
  db.transaction(tx =>{
    tx.executeSql(
      'create table if not exists items (id integer primary key autoincrement, marka text, linkdoobrazka text, data text, spalanienaSto real, rodzajPaliwa text);',
      null,
      ()=>{console.log('db created or updated')},
      ()=>{console.log('db error')}
    );
  })

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
