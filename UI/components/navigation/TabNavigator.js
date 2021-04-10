import React, { useContext } from "react";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator } from "./StackNavigator";
import { AuthContext } from "../functions/auth-context";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const auth = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <Foundation name="magnifying-glass" size={size} color={color} />
              );
            default:
              return (
                <Ionicons
                  name="ios-information-circle"
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
