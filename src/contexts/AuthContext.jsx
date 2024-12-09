import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import api from '@/api';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (authenticated) {
      getAvatar();
    }
  }, [authenticated]);

  async function getAvatar() {
    try {
      const response = await api.get('/auth/profilephoto', {
        responseType: 'blob',
      });
      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setAvatar(imageObjectURL);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthenticated(true);
          setUserData(decodedToken);
        } else {
          Cookies.remove('accessToken');
        }
      } catch (error) {
        console.error('Token inválido', error);
        Cookies.remove('accessToken');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, userData, setUserData, avatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}
