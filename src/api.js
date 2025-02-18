import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "https://www.api.believecalistenia.com.br", // Your backend URL
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add an interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token errors or other errors globally
    if (error.response && error.response.status === 401) {
      alert("Unauthorized. Please log in.");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  },
);

export default api;
