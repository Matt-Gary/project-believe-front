import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Verifique se o token não expirou
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthenticated(true);
          setUserData(decodedToken); // Armazene os dados do token
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
