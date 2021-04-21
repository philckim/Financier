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
    <div className="header-container">
      <div className="header-info">
        Welcome
        {auth.isLoggedIn &&
          ` ${auth.name.replace(/^\w/, (c) => c.toUpperCase())}`}
      </div>
      <Button onClick={logoutHandler}>LOGOUT</Button>
    </div>
  );
};

export default Header;
