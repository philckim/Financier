import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from 'firebase';
import firebaseConfig from './config/default';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
