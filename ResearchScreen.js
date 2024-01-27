import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

const ResearchScreen = () => {
  const actions = [
    {
      icon: require('./assets/plus.png'),
      name: 'new_subject',
      position: 2,
    },
    // Ajoutez d'autres actions si nécessaire
  ];

  return (
    <View style={styles.container}>
      {/* Votre contenu principal ici */}
      
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
    // Assurez-vous que le contenu principal prend toute la hauteur de l'écran
    // (par exemple, en utilisant justifyContent: 'flex-end' si nécessaire)
  },
});

export default ResearchScreen;
