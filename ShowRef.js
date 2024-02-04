import React from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran


const ShowRef = () => {

    // Set fonts style
    const [fontsLoaded] = useFonts({
      Minecraft: require('./assets/fonts/minecraft_font.ttf'),
    });

    // Je n'affiche rien si la police n'a pas été chargé
    if (!fontsLoaded) {
      return null;
    }

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Je quitte le clavier
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>

    <View style={styles.container}>

      <View style={styles.firstContainer}>
        <TextInput
          placeholder='Rechercher'
          style= {styles.textInput}
        />
      </View>

    </View>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor : 'gray'
  },
  firstContainer: {
    backgroundColor : 'yellow',
    flexDirection: 'row',
    alignItems : 'center',
    flex: 0.2,
    justifyContent: 'center' // Centrer le text input
  },

  textInput : {
    width: screenWidth - 60,
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
    fontFamily: 'Minecraft',
    textAlign: 'center',
    backgroundColor: '#ffffff'
  }

});

export default ShowRef;
