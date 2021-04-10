import React, { useContext } from "react";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from "../functions/auth-context";
import { HomeStackNavigator, LoginStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const auth = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return <Foundation name="home" size={size} color={color} />;
            case "Login":
              return <Foundation name="lock" size={size} color={color} />;
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
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Login" component={LoginStackNavigator} />

      <Tab.Screen name="Home" component={HomeStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
