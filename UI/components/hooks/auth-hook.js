import * as SecureStore from "expo-secure-store";
import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((name, image, userId, token, expirationDate) => {
    setName(name);
    setImage(image);
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    SecureStore.setItemAsync("name", name);
    SecureStore.setItemAsync("image", image);
    SecureStore.setItemAsync("token", token);
    SecureStore.setItemAsync("userId", userId);
    SecureStore.setItemAsync("expiration", tokenExpirationDate.toISOString());
  }, []);

  const logout = useCallback(() => {
    setName(null);
    setImage(null);
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    SecureStore.deleteItemAsync("name");
    SecureStore.deleteItemAsync("image");
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("userId");
    SecureStore.deleteItemAsync("expiration");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await {
        name: SecureStore.getItemAsync("name"),
        image: SecureStore.getItemAsync("image"),
        token: SecureStore.getItemAsync("token"),
        userId: SecureStore.getItemAsync("userId"),
        expiration: SecureStore.getItemAsync("expiration"),
      };
      return results;
    };
    const storedData = fetchData();
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.name,
        storedData.image,
        storedData.token,
        storedData.userId,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, name, image };
};
