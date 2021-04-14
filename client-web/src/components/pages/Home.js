import React, { useContext } from "react";
import { AuthContext } from "../functions/auth-context";

const Home = (props) => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
  };
  return (
    <div>
      Home
      <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  );
};

export default Home;
