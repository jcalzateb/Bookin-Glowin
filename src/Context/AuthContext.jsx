import { createContext, useState, useEffect } from "react";
import { obtenerUsuarioActual } from "../Services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioGuardado = await obtenerUsuarioActual();
      if (usuarioGuardado) {
        setUsuario(usuarioGuardado);
      }
    };
    cargarUsuario();
  }, []);

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
