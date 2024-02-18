import React, {useState,useEffect} from 'react';
import { View, StyleSheet,FlatList, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions, Text, Image, Pressable } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran

let DATA = [
  {
    id: 'Auc',
    title: 'Auc',
  },
];

let testData = []

const ShowRef = ({ navigation, route }) => {

  const [data_in_flatlist, setDataInSwipelist] = useState(DATA);

  const [TitleTextWidth, setTextWidth] = useState(0);

  const handleTextLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };

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

  const actions = [
    {
      icon: require('./assets/plus.png'),
      name: 'new_ref',
      position: 2,
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      {title === 'Aucun' ? (
      <Text style={styles.textItem}>{title}</Text>
    ) : (
      <View>
      <View style= {{borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 8}}>
        <Text style={styles.textItem}>Bon y a quelque chose</Text>
      </View>
      
      <View style= {{borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 8, paddingTop: 8}}>
        <Text>VERSET :</Text>
      </View>

      <View style= {{borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 8, paddingTop: 8}}>
        <Text>COMMENTAIRE</Text>
      </View>

      <View style= {{ paddingTop: 8}}>
        <Text>IMAGE</Text>
      </View>

      </View>
    )}
    </View>
  );
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
            flex: 1, justifyContent: 'center'
          }}>
            <Text
            onLayout={handleTextLayout}
            style={{
              position: 'absolute',
              right: screenWidth/2 - TitleTextWidth/2,
              fontSize: 30,
              fontFamily: 'Minecraft',
              letterSpacing: 1, // espace entre les lettre
              marginTop: 10,
            
            }}>{route.params.subject}</Text>
          </View>

        </View>

        <View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}></View>

        <SafeAreaView style={styles.ListContainer}>

        <FlatList
          data={data_in_flatlist}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />

        </SafeAreaView>

        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            // if (name === 'new_ref') {
            //   console.log('okok');
            // } 
            console.log("okokok nananan");
          }}
          position="right"
          animated={false}
          color="#a8c66c"
          overrideWithAction
          iconWidth={40}
          iconHeight={40}
        />


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
    flex: 0.1,
    marginTop: 40,
  },
  containerArrow: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    backgroundColor: '#e1dd72',
    padding: 10, // Créer plus d'espace pour l'item
    width: screenWidth - 50,
    marginVertical: 8, // espace entre les items
    borderWidth: 1, // épaisseur des bordures
    borderRadius: 20, // rayon des bordures
    alignItems: 'center',
  },
  show_all_ref: {
    alignSelf: 'stretch',
  },
  textItem: {
    fontSize: 25,
    fontFamily: 'Minecraft',
  },
  ListContainer: {
    flex: 1,
    //backgroundColor: 'gray',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

export default ShowRef;
