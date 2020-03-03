import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';



export default function Result( { route } ) {
    const {marka, spalanie, kilometry, cenaPaliwaZaLitr} = route.params;
    
    const spalanieNa100 = (spalanie / kilometry) * 100;
    const kosztNa100km = spalanieNa100 * cenaPaliwaZaLitr;  
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Wyniki</Text>
            <Text style={styles.text}>Marka auta: {marka}</Text>
            <Text style={styles.text}>Spalanie auta: {Number(spalanieNa100).toFixed(2)} L / 100 km</Text>
            <Text style={styles.text}>Cena paliwa za litr: {Number(cenaPaliwaZaLitr).toFixed(2)} PLN</Text>            
            <Text style={styles.text}>Koszt przejechania 100 kilometrów wynosi {Number(kosztNa100km).toFixed(2)} PLN</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#eee',
    },
    text: {
        padding: 5,
        marginTop: 10,
        textAlign: 'justify',
        fontSize: 17,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});
