import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';

const HomeScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [personne, setPersonne] = useState(null);
  const [listeTerrain, setListeTerrain] = useState([]);
  const navigation = useNavigation();

  const handleSignout = () => {
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>Terrain: {item.idTerrain}</Text>
      <Text style={styles.tableCell}>Longitude: {item.longitute}</Text>
      <Text style={styles.tableCell}>Latitude: {item.latitude}</Text>
      <Text style={styles.tableCell}>Nb parcelle: {item.nbParcelle}</Text>
      <Text style={styles.tableCell}>Description: {item.descriptionTerrain}</Text>
    </View>
  );

  useEffect(() => {
    const fetchPersonne = async () => {
      try {
        const response = await fetch('https://backend-production-b756.up.railway.app/personne/findPersonneById/' + userId);

        if (response.ok) {
          const data = await response.json();
          setPersonne(data);
        } else {
          console.warn('Server responded with an error:', response.status);
        }
      } catch (error) {
        console.error('An error occurred during the fetch:', error);
      }
    };

    const fetchListeTerrain = async () => {
      try {
        const response = await fetch('https://backend-production-b756.up.railway.app/viewterrainpersonne/findTerrainPersonneValider/'+ userId);
        if (response.ok) {
          const data = await response.json();
          setListeTerrain(data);
        } else {
          console.warn('Server responded with an error:', response.status);
        }
      } catch (error) {
        console.error('An error occurred during the fetch:', error);
      }
    };

    fetchPersonne();
    fetchListeTerrain();
  }, [userId]);

  useEffect(() => {
    // Set header title dynamically
    const headerTitle = `Bienvenue${personne ? `, ${personne.nameUser}` : ""}`;
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>{headerTitle}</Text>,
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            onPress={() => {
              // Navigation to AjouterTerrain screen
              // Add your navigation logic here
            }}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Ajouter Terrain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Navigation to ListeTerrain screen
              // Add your navigation logic here
            }}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Liste Terrain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignout}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [personne, navigation]);

  return (
    <View style={styles.container}>
      <Text>User: {personne && personne.nameUser}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Terrain</Text>
        <Text style={styles.tableHeaderCell}>Longitude</Text>
        <Text style={styles.tableHeaderCell}>Latitude</Text>
        <Text style={styles.tableHeaderCell}>Nb parcelle</Text>
        <Text style={styles.tableHeaderCell}>Description</Text>
      </View>
      <FlatList
        data={listeTerrain}
        renderItem={renderItem}
        keyExtractor={(item) => item.idTerrain.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#78C5EF',
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  tableCell: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default HomeScreen;
