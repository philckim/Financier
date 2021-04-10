import React from "react";
import * as firebase from "firebase";
import firebaseConfig from "./config/default";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "./components/hooks/auth-hook";
import TabNavigator from "./components/navigation/TabNavigator";
import { AuthContext } from "./components/functions/auth-context";

firebase.initializeApp(firebaseConfig);

const App = () => {
  const { token } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
      }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
