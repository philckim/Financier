import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Authenticate from "./components/pages/Authenticate";
import Dashboard from "./components/layout/Dashboard";
import Home from "./components/pages/Home";
import { useAuth } from "./components/hooks/auth-hook";
import { AuthContext } from "./components/functions/auth-context";

import "./components/css/app.css";

const App = () => {
  const { token, login, logout, userId, name } = useAuth();
  let routes = getRoutes(!!token);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
        name: name,
      }}>
      {!!token && <Dashboard />}
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;

const getRoutes = (isLoggedIn) => {
  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
};
