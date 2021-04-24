import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import AccountScreen from "./components/pages/AccountScreen";
import { AuthContext } from "./components/functions/auth-context";
import Header from "./components/layout/Header";
import HomeScreen from "./components/pages/HomeScreen";
import LoginScreen from "./components/pages/LoginScreen";
import { useAuth } from "./components/hooks/auth-hook";
import "./components/css/app.css";

const App = () => {
  const { token, login, logout } = useAuth();
  let routes = getRoutes(!!token.token);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token.token,
        login: login,
        logout: logout,
        email: token.email,
        name: token.name,
        userId: token.userId,
        token: token.token,
      }}>
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;

const getRoutes = (isLoggedIn) => {
  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route path="/acc=:accountId">
            <AccountScreen />
          </Route>
          <Redirect to="/" exact />
        </Switch>
      </React.Fragment>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <LoginScreen />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
};
