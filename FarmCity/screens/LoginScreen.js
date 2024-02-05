import {
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
const LoginScreen = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://backend-production-b756.up.railway.app/personne/checkPersonne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameUser: name,
            passUser: pass,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      if (data) {
        navigation.navigate("Home", { userId: data});
      } else {
        setMessage("Utilisateur non trouvé");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://backend-production-b756.up.railway.app/personne/insertPersonne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameUser: name,
            passUser: pass,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      setMessage("Inscription réussie");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom d'utilisateur"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={pass}
          onChangeText={(text) => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.btn}>
          <Text style={styles.btnText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.btn, styles.btnOutLine]}
        >
          <Text style={styles.btnOutLineText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  btn: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnOutLine: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  btnOutLineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  messageContainer: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
