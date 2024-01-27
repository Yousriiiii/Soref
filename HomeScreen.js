import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Minecraft: require('./assets/fonts/minecraft_font.ttf'),
  });

  const [titleText, setTitleText] = useState('Vos sujets');

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

      {/* Barre de statut avec fond noir */}
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
    backgroundColor: 'gray',
    width: '100%',
    padding: 50,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Minecraft',
  },
});

export default HomeScreen;
