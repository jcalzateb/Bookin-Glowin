import React, { createContext, useState, useEffect } from "react";
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

  const verificarUsuario = async () => {
    if (estaAutenticado()) {
      const token = localStorage.getItem("token");
      const usuarioDecodificado = decodificarToken(token);
      const datosUsuario = await obtenerDatosUsuario(usuarioDecodificado.id);
      if (datosUsuario) {
        setUsuario(datosUsuario);
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
