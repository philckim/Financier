import * as SecureStore from "expo-secure-store";
import { useState, useCallback, useEffect } from "react";

/**
 * A self contained authentication functionality to save user states into context.
 * @returns User states, login and logout functionality
 */
export const useAuth = () => {
  const [token, setToken] = useState();

  const login = useCallback((token) => {
    setToken(token);
    // SecureStore.setItemAsync("token", token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    // SecureStore.deleteItemAsync("token");
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const results = await {
  //         token: SecureStore.getItemAsync("token"),
  //       };
  //       return results;
  //     };
  //     const storedData = fetchData();
  //     login(storedData.token);
  //   }, [login]);

  return { token, login, logout };
};