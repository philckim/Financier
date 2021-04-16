import React, { useContext } from "react";

import { AuthContext } from "../functions/auth-context";
import Dashboard from "../layout/Dashboard";

const Home = (props) => {
  const auth = useContext(AuthContext);

  return <div>{auth.isLoggedIn ? <Dashboard /> : "ERROR"}</div>;
};

export default Home;
