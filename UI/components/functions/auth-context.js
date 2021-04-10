import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  image: `./assets/logo.png`,
  token: null,
  login: () => {},
  logout: () => {},
});
