import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Authenticate from "./components/pages/Authenticate";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import { useAuth } from "./components/hooks/auth-hook";
import { AuthContext } from "./components/functions/auth-context";

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
            <Home />
          </Route>
          <Redirect to="/" exact />
        </Switch>
      </React.Fragment>
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
