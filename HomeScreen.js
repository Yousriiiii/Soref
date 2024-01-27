import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';
import * as FileSystem from 'expo-file-system';

const HomeScreen = () => {

  dataToShow = {};

  useEffect(() => {
    const writeToFile = async () => {
      const filePath = `${FileSystem.documentDirectory}data.json`; // Fichier qui va contenir les données de toutes les références

      jsonData = {
        "Santé": {"sourate": 5, "verset": 10},
        "Vie":{"sourate": 10, "verset": 16},
      }

      try {
        // Write to file
        //await FileSystem.writeAsStringAsync(filePath, JSON.stringify(jsonData));

        // Read from file
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const parsedData = JSON.parse(fileContent);

        //console.log('File content:', parsedData);
        dataToShow = parsedData;
        //console.log(`${FileSystem.documentDirectory}data.json`);
      } catch (error) {
        console.error('Error accessing file:', error);
      }
    };

    writeToFile();
  }, []);


  // Set fonts style
  const [fontsLoaded] = useFonts({
    Minecraft: require('./assets/fonts/minecraft_font.ttf'),
  });

  const [titleText, setTitleText] = useState('Mes sujets');

  const actions = [
    {
      icon: require('./assets/plus.png'),
      name: 'new_subject',
      position: 2,
    },
  ];

  // Je n'affiche rien si la polica n'a pas été chargé
  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titleText}</Text>
      </View>

      {/* Barre de statut en fond noir */}
      <StatusBar barStyle="dark-content" />

      {/* Bouton flottant en bas à droite */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === 'new_subject') {
            console.log('Bouton Nouveau appuyé');
          }
        }}
        position="right"
        animated={false}
        color="#C08926"
        overrideWithAction
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 0.1,
    //backgroundColor: 'gray',
    width: '100%',
    padding: 50,
    alignItems: 'center', // centre le titre au centre horizontale
    borderBottomWidth: 1, // épaisseur de ligne
    borderBottomColor: 'black', // couleur de la ligne qui se trouve sous le titre
    paddingBottom: 5, //Permet de mettre en place la ligne en dessous du texte
  },
  title: {
    fontSize: 30,
    fontFamily: 'Minecraft',
    letterSpacing: 1, // espace entre les lettre
    marginTop: 20,
  },
});

export default HomeScreen;
