import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import AccountDetail from "./components/pages/AccountDetail";
import AccountScreen from "./components/pages/AccountScreen";
import { AuthContext } from "./components/functions/auth-context";
import Header from "./components/layout/Header";
import HomeScreen from "./components/pages/HomeScreen";
import LoginScreen from "./components/pages/LoginScreen";
import { useAuth } from "./components/hooks/auth-hook";
import "./components/css/app.css";

/** Icon Library */
library.add(fas);

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
        <div className="header-container">
          <Header />
        </div>
        <div className="viewport">
          <Switch>
            <Route path="/" exact>
              <HomeScreen />
            </Route>
            <Route path="/acc=:accountId" exact>
              <AccountScreen />
            </Route>
            <Route path="/acc=:accountId/sub=:subAccount" exact>
              <AccountDetail />
            </Route>
            <Redirect to="/" exact />
          </Switch>
        </div>
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
