import * as FileSystem from 'expo-file-system';

class FM {
  JSONpath = FileSystem.documentDirectory + 'data.json'; // Chemin vers le fichier JSON

  async add_new_ref(new_subject) {
    // Première étape, je lis ce qu'il y a dans le json et puis je vérifie et puis la j'écris
    const currentData = await this.read_file();
    let updatedData;

    if("default" in currentData){
        // Clear and make new data
        this.rewrite_data(new_subject);
        updatedData = currentData;
        console.log("ahahahahaah");

    }else{
        console.log("j'ajoute ici", updatedData);
        // Add it to file
        updatedData = [...currentData, new_subject];
        this.rewrite_data(updatedData);  
    }

    // Et en même temps il me renvoie les données courantes
    return updatedData

  }

  async read_file() {
    try {
      const fileContent = await FileSystem.readAsStringAsync(this.JSONpath);
      const parsedData = JSON.parse(fileContent);

      return parsedData;
    } catch (error) {
      console.error('Erreur lors de la lecture :', error);
    }
  }

  async rewrite_data(data){

    new_data = {}

    new_data[data] = [];

    try {
        await FileSystem.writeAsStringAsync(this.JSONpath, JSON.stringify(new_data));
      } catch (error) {
        console.error('Erreur lors de la réécriture des données :', error);
      }
    }


    async get_all_ref() {
        let data_to_return = [];
    
        try {
          const fileContent = await FileSystem.readAsStringAsync(this.JSONpath);
          const parsedData = JSON.parse(fileContent);
    
          for (const [key, value] of Object.entries(parsedData)) {
            data_to_return.push({ id: key, title: key });
          }
          return data_to_return;
        } catch (error) {
          console.error('Erreur lors de la lecture :', error);
          return [];
        }
      }
    }

export default FM;
