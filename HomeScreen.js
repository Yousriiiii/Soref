import React from 'react';
import { View, StyleSheet, Image , StatusBar, Text} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useState } from 'react';

const HomeScreen = () => {

  const [titleText, setTitleText] = useState("Vos sujets");

  const actions = [
    {
      icon: require('./assets/plus.png'),
      name: 'new_subject',
      position: 2,
    },
  ];

  return (
    <View style={styles.container}>
      
      <View>
        <Text style={styles.title}>
          {titleText}
        </Text>
      </View>

      {/* Barre de statut avec fond noir */}
      <StatusBar barStyle="dark-content" />

      {/* Bouton flottant en bas à droite */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === 'new_subject') {
            // Gérez l'événement du bouton ici
            console.log('Bouton Nouveau appuyé');
          }
        }}
        position="right"
        animated={false}
        color='#C08926'
        overrideWithAction
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center', // Centrer horizontalement
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 4, 
  }
});

export default HomeScreen;
