import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

class FM {
  static JSONpath = FileSystem.documentDirectory + 'data.json'; // Chemin vers le fichier JSON

  static async check_if_file_exist() {

    //await FileSystem.deleteAsync(FM.JSONpath); // Ca détruit le fichier pour qu je recommence mes test

    // Créer un fichier s'il n'existe pas
    const dirInfo = await FileSystem.getInfoAsync(FM.JSONpath);

    if (!dirInfo.exists) {
      // Il n'existe pas du coups je le créer
      await FileSystem.writeAsStringAsync(FM.JSONpath, JSON.stringify({ "Aucun": [] }));
      return false;
    } else {
      return true;
    }
  }

  async add_new_ref(new_subject) {
    // Première étape, je lis ce qu'il y a dans le json et puis je vérifie et puis la j'écris
    const currentData = await this.read_file();

    if (currentData.hasOwnProperty("Aucun")) {
      console.log("je recirs tous");
      // Clear and make new data
      const new_item = {};
      new_item[new_subject] = [];
      this.rewrite_data(new_item);
    } else {
      // Add it to file 
      console.log("je dois ajouter une ref");
      if (!currentData.hasOwnProperty(new_subject)) {
        // Si la clé est nouvelle ajoute la
        currentData[new_subject] = [];
        console.log("la nouvelle valeur est ajouté");
      } else {
        console.log("il y a déjà une clé");
        Alert.alert('Ce sujet existe déjà')
      }
      this.rewrite_data(currentData);
    }
  }

  async read_file() {
    try {
      const fileContent = await FileSystem.readAsStringAsync(FM.JSONpath);
      const parsedData = JSON.parse(fileContent);

      return parsedData;
    } catch (error) {
      console.error('Erreur lors de la lecture :', error);
    }
  }

  async rewrite_data(data) {

    try {
      console.log("ce que je dois écrire", data);
      if (data.length != 0) {
        await FileSystem.writeAsStringAsync(FM.JSONpath, JSON.stringify(data));
      } else {
        await FileSystem.writeAsStringAsync(FM.JSONpath, JSON.stringify({ "Aucun": [] }));
      }
    } catch (error) {
      console.error('Erreur lors de la réécriture des données :', error);
    }
  }

  async get_all_ref() {
    let data_to_return = [];

    try {
      const fileContent = await FileSystem.readAsStringAsync(FM.JSONpath);
      const parsedData = JSON.parse(fileContent);
      console.log("ce que j'ai lu est", parsedData);

      for (const [key, value] of Object.entries(parsedData)) {
        data_to_return.push({ id: key, title: key });
      }
      return data_to_return;
    } catch (error) {
      console.error('Erreur lors de la lecture :', error);
      return [];
    }
  }

  async delete_theme(key_to_delete) {
    // Supprime un sujet
    let data_without_key_to_return = [];
    let data_for_rewritten = {};

    try {
      const fileContent = await FileSystem.readAsStringAsync(FM.JSONpath);
      const parsedData = JSON.parse(fileContent);

      for (const [key, value] of Object.entries(parsedData)) {
        if (key_to_delete == key) {
          continue;
        } else {
          // Les autres valeurs, je peux les laisser 
          data_without_key_to_return.push({ id: key, title: key });
          data_for_rewritten[key] = value; // C'est dommage que je réecrit tous ;(
        }
      }
      await this.rewrite_data(data_for_rewritten);
      return data_without_key_to_return;
    } catch (error) {
      console.error('Erreur lors de la lecture :', error);
      return [];
    }


  }

  async rename_theme(key_to_rename, name_of_new_key) {
    let data_to_return = [];
    let data_for_rewritten = {};

    console.log('ooooooookkkkkkkkkkkkkkkk');

    try {
      const fileContent = await FileSystem.readAsStringAsync(FM.JSONpath);
      const parsedData = JSON.parse(fileContent);

      for (const [key, value] of Object.entries(parsedData)) {
        if (key_to_rename == key) { // Je chnage donc la clé
          console.log('enrvant 2');
          if(data_for_rewritten.hasOwnProperty(key_to_rename)){
            console.log('enrvant 3');
            data_to_return.push({ id: name_of_new_key, title: name_of_new_key });
            data_for_rewritten[name_of_new_key] = value; // C'est dommage que je réecrit tous ;(
            }else{
              console.log('enrvant 4');
              Alert.alert('Ce sujet existe déjà');
            }
        } else {
          console.log('enrvant');
          data_to_return.push({ id: key, title: key });
          data_for_rewritten[key] = value; // C'est dommage que je réecrit tous ;(
        }
      }
      await this.rewrite_data(data_for_rewritten);
      return data_to_return;
    } catch (error) {
      console.error('Erreur lors de la lecture :', error);
      return [];
    }


  }



}

export default FM;
