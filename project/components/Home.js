import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Home({ navigation }) {
    const [marka, setMarka] = useState('');
    const [spalanie, setSpalanie] = useState(0);
    const [kilometry, setKilometry] = useState(0);
    const [cenaPaliwaZaLitr, setCenaPaliwaZaLitr] = useState(0);

    function oblicz() {

        if (checkIfInputIsANumberAndIsNotEmpty(spalanie) == false) { ToastAndroid.show("Spalanie musi być liczbą i nie być puste", ToastAndroid.SHORT); return; }
        if (checkIfInputIsANumberAndIsNotEmpty(kilometry) == false) { ToastAndroid.show("Kilometry muszą być liczbą i nie być puste", ToastAndroid.SHORT); return; }
        if (checkIfInputIsANumberAndIsNotEmpty(cenaPaliwaZaLitr) == false) { ToastAndroid.show("Cena paliwa za litr musi być liczbą i nie być puste", ToastAndroid.SHORT); return; }

        navigation.navigate('Result',
            {
                marka: marka,
                spalanie: spalanie,
                kilometry: kilometry,
                cenaPaliwaZaLitr: cenaPaliwaZaLitr
            })
    }

    function checkIfInputIsANumberAndIsNotEmpty(input) {
        if (isNaN(input)) return false;
        if (input == "") return false;
        return true;
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Uzupełnij dane</Text>

            <Text style={styles.text}>Wpisz markę auta</Text>
            <TextInput style={styles.textInput} onChangeText={text => setMarka(text)} />

            <Text style={styles.text}>Ile litrów paliwa spaliło auto:</Text>
            <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={text => setSpalanie(text)} />

            <Text style={styles.text}>Ile kilometrów przejechało auto:</Text>
            <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={text => setKilometry(text)} />

            <Text style={styles.text}>Koszt paliwa za litr:</Text>
            <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={text => setCenaPaliwaZaLitr(text)} />

            <TouchableOpacity style={styles.button} onPress={() => oblicz()}>
                <Text style={styles.buttonText}>Oblicz</Text>
            </TouchableOpacity>

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
    textInput: {
        borderWidth: 1,
        paddingLeft: 20,
        height: 40,
        borderColor: 'gray',
        color: 'black',
        borderRadius: 10,
        borderStyle: 'dashed',
        backgroundColor: '#fff',
    },
    text: {
        padding: 5,
        marginTop: 15,
    },
    button: {
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#aeaeae',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});
