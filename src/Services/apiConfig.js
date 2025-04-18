import axios from "axios";

//const API_URL = process.env.VITE_API_URL || 'http://localhost:8080';
const API_URL = 'http://34.204.69.190:8080';
console.log("API_URL:", API_URL); // Agrega esto para verificar la URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
