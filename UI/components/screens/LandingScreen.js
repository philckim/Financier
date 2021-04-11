import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/colors";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../functions/validators";
import { useForm } from "../hooks/form-hook";

const SignupScreen = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={["#6DD5FA", "#FFFFFF"]}
        style={styles.linearGradient}>
        <View style={styles.inputContainer}>{getContent}</View>
        <Text onPress={switchModeHandler}>Switch Modes</Text>
        <Button onPress={authSubmitHandler} title="Log In" />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const switchModeHandler = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  if (!isLoginMode) {
    setFormData(
      {
        ...formState.inputs,
        name: undefined,
        image: undefined,
      },
      formState.inputs.email.isValid && formState.inputs.password.isValid
    );
  } else {
    setFormData(
      {
        ...formState.inputs,
        name: {
          value: "",
          isValid: false,
        },
        image: {
          value: null,
          isValid: false,
        },
      },
      false
    );
  }
  setIsLoginMode((prevMode) => !prevMode);
};

const authSubmitHandler = async (event) => {
  event.preventDefault();

  if (isLoginMode) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          formState.inputs.email.value,
          formState.inputs.password.value
        )
        .then((res) => {
          auth.login(res.user.refreshToken);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (err) {}
  } else {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
        .then((res) => {
          res.user.updateProfile({
            email: enteredEmail,
          });
          console.log("User registered successfully!");
          resetInputHandler();
          props.navigation.navigate("LoginStack");
        })
        .catch((error) => setError({ errorMessage: error.message }));
    } catch (err) {}
  }
};

const getContent = () => {
  return (
    <>
      <TextInput
        style={styles.input}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"email address"}
        placeholderTextColor="#8e9eab"
        keyboardType="email-address"
        onChangeText={inputHandler}
        value={formState.inputs.email.value}
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
        onChangeText={inputHandler}
        value={formState.inputs.password.value}
      />
      {!isLoginMode && (
        <TextInput
          style={styles.input}
          blurOnSubmit
          placeholder={"retype password"}
          placeholderTextColor="#8e9eab"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={inputHandler}
          value={formState.inputs.password.value}
        />
      )}
    </>
  );
};

export default SignupScreen;

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
  input: {
    width: "90%",
    textAlign: "center",
    borderRadius: 5,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 18,
  },
  loginButton: {
    marginTop: 25,
    color: "#006AFF",
    fontSize: 18,
    textAlign: "center",
  },
});
