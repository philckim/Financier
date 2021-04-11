import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();

const defaultStyling = (route) => {
  return {
    headerTintColor: "blue",
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
        name="Home"
        component={HomeScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </HomeStack.Navigator>
  );
};

export const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </LoginStack.Navigator>
  );
};
