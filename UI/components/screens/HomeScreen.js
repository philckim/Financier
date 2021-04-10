import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "center",
    flexGrow: 1,
  },
});

export default HomeScreen;
