import React, { useContext } from "react";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/colors";
import { AuthContext } from "../functions/auth-context";
import { HomeStackNavigator, LandingStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

/**
 * The primary navigator. Routes are determined in the DisplayRoutes component.
 *
 * Determines the flow upon application load.
 * @return The bottom tab bar as a whole.
 */
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => getScreenOptions(route)}
      tabBarOptions={tabBarOptions}>
      {getRoutes()}
    </Tab.Navigator>
  );
};

/**
 * Customizes the icons and colors for each route.
 * @param route - Changes icon based on route.
 * @return An icon.
 */
const getScreenOptions = (route) => {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      switch (route.name) {
        case "Home":
          return <Foundation name="home" size={size} color={color} />;
        case "Landing":
          return <Foundation name="lock" size={size} color={color} />;
        default:
          return (
            <Ionicons name="ios-information-circle" size={size} color={color} />
          );
      }
    },
  };
};

/**
 * The tab colors and styling.
 */
const tabBarOptions = {
  style: {
    backgroundColor: Colors.slate,
  },
  activeTintColor: Colors.bone,
  inactiveTintColor: Colors.ocean,
};

/**
 * Determines which route is shown to the user based on login state.
 *
 * The topmost tab is displayed first.
 * @param route- The user authentication state.
 * @return The individual tabs displayed in the bar.
 */
const getRoutes = () => {
  const auth = useContext(AuthContext);

  let routes;
  routes = !auth.isLoggedIn ? (
    <Tab.Screen name="Landing" component={LandingStackNavigator} />
  ) : (
    <Tab.Screen name="Home" component={HomeStackNavigator} />
  );
  return routes;
};

export default TabNavigator;
