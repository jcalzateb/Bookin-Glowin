import React, { createContext, useState, useEffect } from "react";
import api from "../Services/apiConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si la sesión esta activa
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data) {
        const usuarioData = {
          nombre: response.data.nombre,
          email: email,
          rol: response.data.rol,
          token: response.data.token,
        };

        localStorage.setItem("usuario", JSON.stringify(usuarioData));
        localStorage.setItem("token", response.data.token);
        setUsuario(usuarioData);

        navigate("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data?.message);
      throw new Error(
        error.response?.data?.message || "Error de autenticación"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
