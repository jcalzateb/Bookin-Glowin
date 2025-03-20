import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUsuario,
  logout,
  estaAutenticado,
  obtenerDatosUsuario,
  decodificarToken,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const verificarUsuario = async () => {
    if (estaAutenticado()) {
      const token = localStorage.getItem("token");
      const usuarioDecodificado = decodificarToken(token);
      const datosUsuario = await obtenerDatosUsuario(usuarioDecodificado.id);
      if (datosUsuario) {
        setUsuario(datosUsuario);
        if (datosUsuario.rol === "CLIENTE") {
          navigate("/");
        } else {
          navigate("/admin");
        }
      }
    }
  };

  useEffect(() => {
    verificarUsuario();
  }, []);

  const login = async (credenciales) => {
    const respuesta = await loginUsuario(credenciales);
    if (respuesta && respuesta.token) {
      const usuarioDecoded = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(usuarioDecoded);
      if (usuarioDecoded.rol === "CLIENTE") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }
  };

  const cerrarSesion = () => {
    logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
