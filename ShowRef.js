import React from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions, Text, Image, Pressable } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran


const ShowRef = ({ navigation, route }) => {


  // console.log(route.params.subject);

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

      <View style={styles.MainContainer}>

        <View style={styles.titleContainer}>
          <View style={styles.containerArrow}>
            <Pressable onPress={() => {
              navigation.navigate("BottomBar")
            }}>
              <Image
                source={require('./assets/fleche_retour.png')}
                resizeMode="cover"
                style={[{ transform: [{ scale: -1 }] }, {
                  resizeMode: 'contain', height: 40, width: 60
                }]}
              />
            </Pressable>
          </View>

          <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 30,
              fontFamily: 'Minecraft',
              letterSpacing: 1, // espace entre les lettre
              marginTop: 10,
            }}>Ma bibliographie</Text>
          </View>

        </View>

        <View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}></View>



      </View>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 0.2,
  },
  containerArrow: {
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default ShowRef;
