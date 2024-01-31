import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, FlatList, SafeAreaView, Dimensions, Modal, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useFonts } from 'expo-font';
import * as FileSystem from 'expo-file-system';
import FM from "./FileManager";
import { SwipeListView } from 'react-native-swipe-list-view';

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran
const screenHeight = Dimensions.get('window').height;

let DATA = [
  {
    id: 'Aucun',
    title: 'Aucun',
  },
];


const HomeScreen = () => {

  const [titleText, setTitleText] = useState('Mes sujets');

  const [modalVisible, setModalVisible] = useState(false);

  const [newPotentialSubject, onChangeText] = useState();

  const [data_in_flatlist, setDataInFlatlist] = useState(DATA);

  useEffect(() => {
    const change_data = async () => {
      const fileM = new FM();
      const all_ref = await fileM.get_all_ref();
      setDataInFlatlist(all_ref);
    }

    const check_file = async () => {
      if (await FM.check_if_file_exist()) {
        // true il existe déjà - false il n'existe pas (il vient d'etre créer)
        change_data();
      } else {
        console.log("je laisse la variable par défaut");
        setDataInFlatlist(DATA);
      }
    }

    check_file();
  }, []);


  // Fonction qui retourne les composants des items de la flatlist
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Pressable onPress={() => {
        console.log("ok");
      }} style={styles.show_all_ref}>
        <Text style={styles.textItem}>{title}</Text>
      </Pressable>
    </View>
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Je quitte le clavier
  };

  const add_new_ref = async () => {
    let fileM = new FM();

    await fileM.add_new_ref(newPotentialSubject);

    let new_data = await fileM.get_all_ref();

    console.log("tous les réf sont ", new_data);

    setDataInFlatlist(new_data);
  };

  // Set fonts style
  const [fontsLoaded] = useFonts({
    Minecraft: require('./assets/fonts/minecraft_font.ttf'),
  });

  const actions = [
    {
      icon: require('./assets/plus.png'),
      name: 'new_subject',
      position: 2,
    },
  ];

  // Je n'affiche rien si la police n'a pas été chargé
  if (!fontsLoaded) {
    return null;
  }

  // Test

  // const onRowDidOpen = (rowKey) => {
  //   console.log('une ligne est ouverte');
  // };


  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.mainHiddenView}>
      <View style={styles.hiddenLeftView}  >
        <Pressable
          onPress={()=>{console.log("je dois renommer",data.item.id);}}
        >
          <Image
              source={require('./assets/rename.png')}
              style={styles.hiddenLeftImage}
              resizeMode="cover"
            />
        </Pressable>
      </View>
      <View style={styles.hiddenRightView}>
        <Pressable
        onPress={()=>{console.log("je dois supprimer",data.item.id);}}>
        <Image
            source={require('./assets/poubelle.png')}
            style={styles.hiddenRightImage}
            resizeMode="cover"
          />
                  </Pressable>

      </View>
    </View>
  );


  return (
    <View style={styles.MainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titleText}</Text>
      </View>

      {/* Barre de statut en fond noir */}
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.ListContainer}>
        {/* <FlatList
          data={data_in_flatlist}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        /> */}
        <SwipeListView
          data={data_in_flatlist}
          renderItem={({ item }) => <Item title={item.title} />}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={70}
          rightOpenValue={-70}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          // onRowDidOpen={onRowDidOpen}
        />
      </SafeAreaView>

      {/* Bouton flottant en bas à droite */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === 'new_subject') {
            onChangeText(""); // J'initialise le texte
            setModalVisible(!modalVisible);
          }
        }}
        position="right"
        animated={false}
        color="#a8c66c"
        overrideWithAction
      />


      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.continerInModal}>
            <Image
              source={require('./assets/topIMG.png')}
              style={[styles.topImage, { transform: [{ scaleY: -1 }] }]}
              resizeMode="cover"
            />
            <Image
              source={require('./assets/bottomIMG.png')}
              style={styles.bottomImage}
              resizeMode="cover"
            />

            <View style={styles.containerTextInModal1}>
              <Text style={styles.titleModal}>Nouveau sujet :</Text>
              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  placeholder="Saisissez le nom du sujet"
                  placeholderTextColor="#94743d"
                />
              </SafeAreaView>

              <SafeAreaView style={{ flexDirection: "row" }}>

                <Pressable
                  onPress={() => {
                    // J'appel la fonction qui permet de créer une nouvelle réf
                    if (newPotentialSubject != "") {
                      add_new_ref();
                    }
                    setModalVisible(!modalVisible); // Je fait disparaitre le modal
                  }}>
                  <Text style={styles.buttonCloseModal} >Ajouter ce sujet</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible); // Je fait juste disparaitre le modal
                  }}>
                  <Text style={styles.buttonCloseModal2} >Annuler</Text>
                </Pressable>

              </SafeAreaView>

            </View>

          </View>
        </TouchableWithoutFeedback>

      </Modal>


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
    alignSelf: 'stretch',
  },
  textItem: {
    fontSize: 25,
    fontFamily: 'Minecraft',
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
  continerInModal: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  containerTextInModal1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
    alignSelf: 'stretch',
    // marginTop: 250,
  },
  input: {
    width: screenWidth - 60,
    borderWidth: 1,
    padding: 20,
    marginTop: 40,
    fontFamily: 'Minecraft',
    textAlign: 'center',
    backgroundColor: '#ffffff'
  },
  buttonCloseModal: {
    top: 30,
    fontFamily: 'Minecraft',
    fontSize: 20,
    textDecorationStyle: 'dashed',
    backgroundColor: '#509110',
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden', // => TROP BIEN, ca permet de supprimer le surplus du background color
    padding: 3,
  },
  buttonCloseModal2: {
    top: 30,
    fontFamily: 'Minecraft',
    fontSize: 20,
    textDecorationStyle: 'dashed',
    backgroundColor: '#872000',
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    padding: 3,
    marginHorizontal: 5
  },
  titleModal: {
    fontSize: 25,
    fontFamily: 'Minecraft',
    backgroundColor: '#d19d00'
  },

  bottomImage: { // Je designe une position absolue pour les images
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: 300,  // Ajustez la hauteur selon vos besoins
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: 400,  // Ajustez la hauteur selon vos besoins
  },
  show_all_ref: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  // Hidden area
  mainHiddenView: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  hiddenLeftView: {
    backgroundColor: '#0a46a6',
    padding:10,
    borderWidth: 1, // épaisseur des bordures
    borderBottomLeftRadius: 20, // rayon des bordures
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  hiddenRightView: {
    backgroundColor: '#750c2a',
    padding:10,
    borderWidth: 1, // épaisseur des bordures
    borderBottomRightRadius: 20, // rayon des bordures
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  hiddenRightImage: {
    flex: 1,
    width: 50,
    resizeMode: 'contain',
  },
  hiddenLeftImage: {
    flex: 1,
    width: 50,
    resizeMode: 'contain',
  },
});

export default HomeScreen;