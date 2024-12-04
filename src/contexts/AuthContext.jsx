import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthenticated(true);
          setUserData(decodedToken);
        } else {
          Cookies.remove('authToken');
        }
      } catch (error) {
        console.error('Token inválido', error);
        Cookies.remove('authToken');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
