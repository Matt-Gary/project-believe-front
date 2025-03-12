import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import api from '@/api';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [admin, setAdmin] = useState(false);
  async function verifyToken() {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthenticated(true);
          console.log(decodedToken);
          if (decodedToken?.role === 'ADMIN') {
            setAdmin(true);
          }
          setUserData(decodedToken);
        } else {
          Cookies.remove('accessToken');
        }
      } catch (error) {
        Cookies.remove('accessToken');
      }
    }
  }
  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (userData?.role === 'ADMIN') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [userData]);

  useEffect(() => {
    if (authenticated) {
      fetchUserPhoto();
    }
  }, [authenticated]);

  async function fetchUserPhoto() {
    try {
      const response = await api.get('/auth/profilephoto', {
        responseType: 'blob',
      });
      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setAvatar(imageObjectURL);
    } catch (error) {
      console.error('Erro ao buscar foto de perfil:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        userData,
        setUserData,
        avatar,
        setAvatar,
        verifyToken,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
