import React, { useContext } from "react";

import { AuthContext } from "../functions/auth-context";
import Button from "../shared/Button";

import "../css/header.css";

const Header = (props) => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
  };
  return (
    <React.Fragment>
      <div className="header-info">
        Welcome
        {auth.isLoggedIn &&
          ` ${auth.name.replace(/^\w/, (c) => c.toUpperCase())}`}
      </div>
      <div className="header-nav-buttons">
        <Button to="/">ACCOUNTS</Button>
        <Button to="/income">INCOME</Button>
        <Button onClick={logoutHandler}>LOGOUT</Button>
      </div>
    </React.Fragment>
  );
};

export default Header;
