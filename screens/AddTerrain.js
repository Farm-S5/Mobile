import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from "react-native";

const AddTerrain = () => {
  const route = useRoute();
  const { userId } = route.params;
  const idUser =userId;
  const [personne, setPersonne] = useState(null);

  const [longitude,setLongitude] = useState("");
  const [latitude,setLatitude] =useState("");
  const [nbParcelle,setNbParcelle] = useState("");
  const [descriptionTerrain,setDescri] =useState("");

  const navigation = useNavigation();

  const handleSignout = () => {
    navigation.replace("Login");
  };

  const handleListeTerrain = () => {
    navigation.replace("Home", { userId: userId });
  };

  const handleAddTerrain = () => {
    navigation.replace("Add", { userId: userId });
  };

  useEffect(() => {
    const fetchPersonne = async () => {
      try {
        const response = await fetch(
          "https://backend-production-b756.up.railway.app/personne/findPersonneById/" +
            userId
        );

        if (response.ok) {
          const data = await response.json();
          setPersonne(data);
        } else {
          console.warn("Server responded with an error:", response.status);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchPersonne();
  }, [userId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            onPress={handleListeTerrain}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Liste terrain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddTerrain}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Ajouter terrain</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignout} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [personne, navigation]);


  async function addTerrain(){
    let item ={longitude,latitude,nbParcelle,descriptionTerrain}
    try {
        let response = await fetch("https://backend-production-b756.up.railway.app/terrain/insertTerrain", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        if (response.ok) {
            const responseData = await response.json();
            const idTerrain = responseData;
            console.log(idTerrain);
            addTerrainPersonne(idTerrain);
            navigation.replace("Home", { userId: userId });
        } else {
            console.warn('Server responded with an error:', response.status);
            try {
                const errorResponse = await response.json();
                console.error('Server error details:', errorResponse);
            } catch (error) {
                console.error('Failed to parse server error details:', error);
            }
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

  async function addTerrainPersonne(idTerrain){
    let item ={idUser,idTerrain}
    try {
        let response = await fetch("https://backend-production-b756.up.railway.app/terrainpersonne/insertTerrainPersonne", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        if (response.ok) {
            console.log("Add Personneterrain ID: " + idTerrain);
        } else {
            console.warn('Server responded with an error:', response.status);
            try {
                const errorResponse = await response.json();
                console.error('Server error details:', errorResponse);
            } catch (error) {
                console.error('Failed to parse server error details:', error);
            }
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

  return (
    <View style={styles.container}>
      <Text style={styles.textUser}>User: {personne && personne.nameUser}</Text>
      <Text style={styles.title}>Ajouter un terrain</Text>
      <View style={styles.inputContainer}>
            <TextInput
              placeholder="Longitude"
              value={longitude}
              onChangeText={(text) => setLongitude(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Latitude"
               value={latitude}
               onChangeText={(text) => setLatitude(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nombre de parcelle"
               value={nbParcelle}
               onChangeText={(text) => setNbParcelle(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Description du terrain"
               value={descriptionTerrain}
               onChangeText={(text) => setDescri(text)}
              style={styles.input}
            />
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity 
             onPress={addTerrain}
             style={styles.btn}>
              <Text style={styles.btnText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 10,
  },
  headerTitle: {
    color: "#3498db",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButtonsContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerButtonText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  textUser: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default AddTerrain;
