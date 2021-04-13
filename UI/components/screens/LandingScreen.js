import React, { useState, useContext } from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";

import { AuthContext } from "../functions/auth-context";
import Card from "../shared/Card";
import Colors from "../constants/colors";
import Input from "../shared/Input";
import { useForm } from "../hooks/form-hook";

const LandingScreen = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
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

  /**
   * Switches the form data when user presses the button.
   */
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: undefined,
          password: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false,
          },
          password: {
            value: null,
            isValid: false,
          },
          verify: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  /**
   * Signs into firebase according to which mode the user has flipped to:
   *
   * Login or Sign Up mode.
   */
  const authHandler = () => {
    if (!formState.inputs) {
      return;
    }
    if (isLoginMode) {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          formState.inputs.email.value,
          formState.inputs.password.value
        )
        .then((res) => {
          auth.login(res.user.refreshToken);
          console.log(`Logged in`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          formState.inputs.email.value,
          formState.inputs.password.value
        )
        .then((res) => {
          res.user.updateProfile({
            email,
          });
          console.log("User registered");
          auth.login(res.user.refreshToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <LinearGradient
        colors={[Colors.ocean, "#FFFFFF"]}
        style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address"
              onInputChange={inputHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password"
              onInputChange={inputHandler}
              initialValue=""
            />
            {!isLoginMode && (
              <Input
                id="verify"
                label="Retype Password"
                keyboardType="default"
                required
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorMessage="Passwords don't match!"
                onInputChange={inputHandler}
                initialValue=""
              />
            )}
            <View style={styles.buttonContainer}>
              <Button
                title={isLoginMode ? "Login" : "Sign Up"}
                color={Colors.slate}
                onPress={authHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isLoginMode ? "Sign Up" : "Login"}`}
                color={Colors.moss}
                onPress={switchModeHandler}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
