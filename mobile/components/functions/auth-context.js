import { createContext } from "react";

/**
 * Context for user data. Stores information externally to reference in other components.
 *
 * Set these to anything that may be useful for a user to have.
 *
 * Theme, userId, email, token, etc.
 *
 *  @example
 * ```javascript
 * const auth = useContext(AuthContext);
 * console.log(`Hello ${auth.userId}!`);
 * ```
 */
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  image: `./assets/logo.png`,
  token: null,
  login: () => {},
  logout: () => {},
});
