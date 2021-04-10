import React from "react";
import {
  Text,
  View,
  Button,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useLogin } from "../hooks/login-hook";

const LoginScreen = (props) => {
  const loginHook = useLogin();

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
            onChangeText={loginHook.emailInputHandler}
            value={loginHook.enteredEmail}
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
            onChangeText={loginHook.passwordInputHandler}
            value={loginHook.enteredPassword}
          />
          <Button onPress={loginHook.loginHandler} title="Log In" />
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
