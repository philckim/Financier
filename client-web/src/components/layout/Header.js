import React, { useContext } from "react";
import { Link } from "react-router-dom";

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
      <div className="header-buttons">
        <Button to="/">ACCOUNTS</Button>
        <Button to="/income">INCOME</Button>
        <Button onClick={logoutHandler}>LOGOUT</Button>
        <Link to="/user">
          <img className="header-avatar" src={`${auth.image}`} alt="Profile" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
