import { TextInput,KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView styles={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom d'utilisteur"
          // value={ }
          // onChangeText={text => }
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          // value={ }
          // onChangeText={text => }
          style={styles.input}
          secureTextEntry
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }
});
