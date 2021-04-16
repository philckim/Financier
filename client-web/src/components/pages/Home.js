import React, { useContext } from "react";
import { AuthContext } from "../functions/auth-context";

const Home = (props) => {
  const auth = useContext(AuthContext);

  return <div>Home</div>;
};

export default Home;
