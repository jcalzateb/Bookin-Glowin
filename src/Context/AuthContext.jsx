import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  usuario: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const usuarioEncontrado = await obtenerUsuarioPorId(1);
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      }
      return usuarioEncontrado;
    } catch (error) {
      console.error(" Error en el login:", error);
      return null;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
