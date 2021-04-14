import { useState, useCallback, useEffect } from "react";
import jwt from "jwt-decode";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [name, setName] = useState();

  // const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((encryptedToken) => {
    let decryptedToken = jwt(encryptedToken);
    setToken(decryptedToken);
    setUserId(decryptedToken.user.userId);
    setName(decryptedToken.user.name);

    // const tokenExpirationDate =
    //   token.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        name: name,
        //expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime =
  //       tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token
        // storedData.userId,
        // storedData.name,
        // new Date(storedData.expiration)
      );
    }
  }, [login]);

  return {
    token: token,
    login,
    logout,
    userId: userId,
    name: name,
  };
};
