import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Result from './components/Result';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Kalkulator spalania' }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{ title: 'Kalkulator spalania'
         }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
