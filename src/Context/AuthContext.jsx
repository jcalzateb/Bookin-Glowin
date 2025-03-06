import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuarioAutenticado(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    setUsuarioAutenticado(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider
      value={{ usuarioAutenticado, setUsuarioAutenticado, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
