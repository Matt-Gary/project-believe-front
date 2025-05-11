import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://www.apii.believecalistenia.com.br', // URL do backend
  withCredentials: true, // Garante que cookies sejam enviados com as requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar interceptor para logs de requisição
api.interceptors.request.use(
  (request) => {
    // Log da requisição

    return request;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  },
);

// Adicionar interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    // Log da resposta

    return response;
  },
  (error) => {
    // Log detalhado do erro
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
        ? {
            url: error.config.url,
            method: error.config.method,
            data: error.config.data,
          }
        : 'No config',
    });

    // Tratar erros de autenticação
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access - redirecting to login');
      window.location.href = '/login'; // Redirecionar para página de login
    }
    return Promise.reject(error);
  },
);

export default api;
