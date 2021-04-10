import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../functions/auth-context";

const HomeScreen = (props) => {
  const auth = useContext(AuthContext);
  return (
    <View style={styles.screen}>
      <Text>HomeScreen</Text>
      <Text>{auth.token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "center",
  },
});

export default HomeScreen;
