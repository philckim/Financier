import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";

const HomeStack = createStackNavigator();
const LandingStack = createStackNavigator();

/**
 * The "stacks" contain the pages and their individual histories.
 * @returns The screen and its child history modules.
 */
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

/**
 * The "stacks" contain the pages and their individual histories.
 * @returns The screen and its child history modules.
 */
export const LandingStackNavigator = () => {
  return (
    <LandingStack.Navigator>
      <LandingStack.Screen
        name="Landing"
        component={LandingScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </LandingStack.Navigator>
  );
};

/**
 * Returns customizable styling based on route.
 * @param {screen} route - The selected route.
 * @returns Styling.
 */
const defaultStyling = (route) => {
  return {
    headerStyle: {
      backgroundColor: Colors.slate,
    },
    headerTintColor: Colors.bone,
    headerTitleStyle: {
      fontSize: 28,
    },
  };
};
