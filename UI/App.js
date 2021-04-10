import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "./components/hooks/auth-hook";
import TabNavigator from "./components/navigation/TabNavigator";
import { AuthContext } from "./components/functions/auth-context";

const App = () => {
  const { token, login, logout, userId, name, image } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        name: name,
        image: image,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
