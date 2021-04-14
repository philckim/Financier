import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  userId: null,
  name: null,
});
