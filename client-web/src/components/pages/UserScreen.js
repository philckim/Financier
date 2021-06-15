import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../functions/auth-context";
import Button from "../shared/Button";
import { useAxiosClient } from "../hooks/axios-hook";

const UserScreen = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div>
      Hello {auth.name}
      <img src={auth.image} alt="Avatar" />
    </div>
  );
};

export default UserScreen;
