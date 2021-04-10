/*jshint esversion: 6 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator();

const defaultStyling = (route) => {
  return {
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 28,
    },
    title: route.name.split("Stack"),
  };
};

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </HomeStack.Navigator>
  );
};
