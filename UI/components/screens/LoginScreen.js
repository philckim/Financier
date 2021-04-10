import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Alert,
  Button,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../hooks/auth-hook";

const LoginScreen = (props) => {
  const { login } = useAuth();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailInputHandler = (value) => {
    setEnteredEmail(value);
  };

  const passwordInputHandler = (value) => {
    setEnteredPassword(value);
  };

  const resetInputHandler = () => {
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const loginHandler = () => {
    //     const email = enteredEmail.toString();
    //     if (email === "" || email.length < 5) {
    //       Alert.alert(
    //         "Invalid Email!",
    //         "You must type in an email address. Minimum 5 characters.",
    //         [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
    //       );
    //       return;
    //     }

    //     const password = enteredPassword.toString();
    //     if (password === "" || password.length < 5) {
    //       Alert.alert(
    //         "Invalid Password!",
    //         "You must type in a password. Minimum 5 characters.",
    //         [
    //           {
    //             text: "Okay",
    //             style: "destructive",
    //             onPress: resetInputHandler,
    //           },
    //         ]
    //       );
    //       return;
    //     }
    //     .signInWithEmailAndPassword(enteredEmail, enteredPassword)
    firebase
      .auth()
      .signInWithEmailAndPassword("test@test.com", "123456")

      .then((res) => {
        login(res.user.refreshToken);
        props.navigation.navigate("HomeStack");
      })
      .catch((error) => {
        console.log(error.message);
      });
    resetInputHandler();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={["#6DD5FA", "#FFFFFF"]}
        style={styles.linearGradient}>
        <Text style={styles.title}>Please Log In to Continue</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={"email address"}
            placeholderTextColor="#8e9eab"
            keyboardType="email-address"
            onChangeText={emailInputHandler}
            value={enteredEmail}
          />
          <TextInput
            style={styles.input}
            blurOnSubmit
            placeholder={"password"}
            placeholderTextColor="#8e9eab"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={passwordInputHandler}
            value={enteredPassword}
          />
          <Button onPress={loginHandler} title="Log In" />
          <View style={styles.buttonContainer}></View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  linearGradient: {
    opacity: 0.95,
    height: "100%",
    width: "100%",
  },
  title: {
    marginVertical: 20,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    textAlign: "center",
    borderRadius: 5,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 18,
  },
  buttonContainer: {
    height: 300,
    width: 300,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  linkButton: {
    borderRadius: 15,
  },
  signupButton: {
    marginTop: 25,
    color: "#006AFF",
    fontSize: 18,
    textAlign: "center",
  },
});
