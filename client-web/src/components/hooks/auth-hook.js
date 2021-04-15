import { useState, useCallback, useEffect } from "react";
import jwt from "jwt-decode";

let logoutTimer;

/**
 * A self contained hook to handle user variables, login and logout functionality.
 * @returns User states, login and logout functionality
 */
export const useAuth = () => {
  const [userData, setUserData] = useState({
    email: null,
    name: null,
    userId: null,
    token: null,
    tokenExpiry: null,
  });

  /**
   * Logs in using an encrypted JWT token.
   *
   * Will look for a locally stored expiration or create one itself
   * @param encryptedToken - Received from the server. Encrypted user object.
   * @param expirationDate - If this was locally stored (ie: close the browser, reopen) it will use this to stay logged in.
   */
  const login = useCallback(
    (encryptedToken, expirationDate) => {
      let decryptedToken = jwt(encryptedToken);

      /**
       * Gives assigns the user a new expiration date (unless they have one)
       */
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

      /**
       * Updates user states. First is all values found in user object.
       */
      setUserData((prevState) => {
        return {
          ...userData,
          ...decryptedToken.user,
          token: encryptedToken,
          tokenExpiry: tokenExpirationDate,
        };
      });

      /**
       * Stores the user data locally so they can relogin.
       */
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: userData.token,
          tokenExpiry: tokenExpirationDate.toISOString(),
        })
      );
    },
    [userData]
  );

  /**
   * Nulls out all of the user values and deletes their local storage.
   */
  const logout = useCallback(() => {
    setUserData({
      email: null,
      name: null,
      userId: null,
      token: null,
      tokenExpiry: null,
    });
    localStorage.removeItem("userData");
  }, []);

  /**
   * Checks remaining time on the user's token.
   */
  useEffect(() => {
    if (userData.token && userData.tokenExpiry) {
      const remainingTime =
        userData.tokenExpiry.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [userData, logout]);

  /**
   * Checks if the user has previously logged in and their token is still valid in local storage.
   * Logs the user in if true, using the previous time.
   */
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExpiry) > new Date()
    ) {
      login(storedData.token, new Date(storedData.tokenExpiry));
    }
  }, [login]);

  return { token: userData, login, logout };
};
