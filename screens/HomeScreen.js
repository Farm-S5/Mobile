import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

const HomeScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [personne, setPersonne] = useState(null);
  const [listeTerrainNonValider, setListeTerrainNonValider] = useState([]);
  const [lisetTerrainValider, setListeTerrainValider] = useState([]);
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

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>Terrain: {item.idTerrain}</Text>
      <Text style={styles.tableCell}>Longitude: {item.longitute}</Text>
      <Text style={styles.tableCell}>Latitude: {item.latitude}</Text>
      <Text style={styles.tableCell}>Nb parcelle: {item.nbParcelle}</Text>
      <Text style={styles.tableCell}>
        Description: {item.descriptionTerrain}
      </Text>
    </View>
  );

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

    const fetchListeTerrainNonValider = async () => {
      try {
        const response = await fetch(
          "https://backend-production-b756.up.railway.app/viewterrainpersonne/findTerrainPersonneNonValider/" +
            userId
        );
        if (response.ok) {
          const data = await response.json();
          setListeTerrainNonValider(data);
        } else {
          console.warn("Server responded with an error:", response.status);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    const fetchListeTerrainValider = async () => {
      try {
        const response = await fetch(
          "https://backend-production-b756.up.railway.app/viewterrainpersonne/findTerrainPersonneValider/" +
            userId
        );
        if (response.ok) {
          const data = await response.json();
          setListeTerrainValider(data);
        } else {
          console.warn("Server responded with an error:", response.status);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchPersonne();
    fetchListeTerrainNonValider();
    fetchListeTerrainValider();
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

  return (
    <View style={styles.container}>
      <Text style={styles.textUser}>User: {personne && personne.nameUser}</Text>
      <Text style={styles.title}>Terrain non validé</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Terrain</Text>
        <Text style={styles.tableHeaderCell}>Longitude</Text>
        <Text style={styles.tableHeaderCell}>Latitude</Text>
        <Text style={styles.tableHeaderCell}>Nb parcelle</Text>
        <Text style={styles.tableHeaderCell}>Description</Text>
      </View>
      {listeTerrainNonValider.map((item) => (
        <TouchableOpacity
          key={item.idTerrain}
          style={styles.tableRow}
          onPress={() => {
            navigation.replace("Update", {
              idUser: userId,
              idTerrain: item.idTerrain,
            });
          }}
        >
          <Text style={styles.tableCell}>{item.idTerrain}</Text>
          <Text style={styles.tableCell}>{item.longitude}</Text>
          <Text style={styles.tableCell}>{item.latitude}</Text>
          <Text style={styles.tableCell}>{item.nbParcelle}</Text>
          <Text style={styles.tableCell}>{item.descriptionTerrain}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.title}>Terrain non validé</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Terrain</Text>
        <Text style={styles.tableHeaderCell}>Longitude</Text>
        <Text style={styles.tableHeaderCell}>Latitude</Text>
        <Text style={styles.tableHeaderCell}>Nb parcelle</Text>
        <Text style={styles.tableHeaderCell}>Description</Text>
      </View>
      {lisetTerrainValider.map((item) => (
        <TouchableOpacity
          key={item.idTerrain}
          style={styles.tableRow}
          onPress={() => {
            navigation.replace("Update", {
              idUser: userId,
              idTerrain: item.idTerrain,
            });
          }}
        >
          <Text style={styles.tableCell}>{item.idTerrain}</Text>
          <Text style={styles.tableCell}>{item.longitude}</Text>
          <Text style={styles.tableCell}>{item.latitude}</Text>
          <Text style={styles.tableCell}>{item.nbParcelle}</Text>
          <Text style={styles.tableCell}>{item.descriptionTerrain}</Text>
        </TouchableOpacity>
      ))}
      <View>
        <Text style={styles.desxription}>Choisir un terrain à modifier</Text>
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
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "green",
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  tableCell: {
    flex: 1,
  },
  desxription: {
    marginTop: 5,
  },
});

export default HomeScreen;
