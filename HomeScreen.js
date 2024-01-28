import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, FlatList, SafeAreaView, Dimensions} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';
import * as FileSystem from 'expo-file-system';

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran

const HomeScreen = () => {

  dataToShow = {};
  /*
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
  */

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{title}</Text>
    </View>
  );

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

      <SafeAreaView style={styles.ListContainer}>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

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
        color="#a8c66c"
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
  ListContainer: {
    flex: 1,
    //backgroundColor: 'gray',
    alignItems: 'center',
    alignSelf:'stretch',
  },
  textItem: {
    fontSize: 25,
    fontFamily: 'Minecraft',
  },
  item: {
    backgroundColor: '#e1dd72',
    padding: 10, // Créer plus d'espace pour l'item
    width: screenWidth-50,
    marginVertical: 8, // espace entre les items
    borderWidth:  1, // épaisseur des bordures
    borderRadius:  20, // rayon des bordures
    alignItems: 'center',
  },
});

export default HomeScreen;
