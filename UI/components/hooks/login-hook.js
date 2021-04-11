import { useState, useContext } from "react";
import * as firebase from "firebase";
import { Alert } from "react-native";

import { AuthContext } from "../functions/auth-context";

/**
 * @desc A login module that handles form input.
 *
 * Throws an alert if input does not match criteria.
 *
 * Attempts to log in with the information.
 * @returns Entered values, event handlers.
 */
export const useLogin = () => {
  const auth = useContext(AuthContext);
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
    const email = enteredEmail.toString();
    if (email === "" || email.length < 5) {
      Alert.alert(
        "Invalid Email!",
        "You must type in an email address. Minimum 5 characters.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    const password = enteredPassword.toString();
    if (password === "" || password.length < 5) {
      Alert.alert(
        "Invalid Password!",
        "You must type in a password. Minimum 5 characters.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((res) => {
        auth.login(res.user.refreshToken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return {
    emailInputHandler,
    passwordInputHandler,
    loginHandler,
    enteredEmail,
    enteredPassword,
  };
};
