import { createContext, useState, useEffect } from "react";
import { obtenerUsuarioActual } from "../Services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      console.log("🔄 Verificando usuario en localStorage...");
      const usuarioGuardado = localStorage.getItem("usuario");

      if (usuarioGuardado) {
        console.log(
          "✅ Usuario encontrado en localStorage:",
          JSON.parse(usuarioGuardado)
        );
        setUsuario(JSON.parse(usuarioGuardado));
      } else {
        console.log(
          "❌ No hay usuario en localStorage, consultando backend..."
        );
        const usuarioActual = await obtenerUsuarioActual();
        if (usuarioActual) {
          console.log("✅ Usuario obtenido del backend:", usuarioActual);
          setUsuario(usuarioActual);
          localStorage.setItem("usuario", JSON.stringify(usuarioActual));
        } else {
          console.log("❌ No se pudo obtener usuario del backend.");
        }
      }
    };
    cargarUsuario();
  }, []);

  const login = (datosUsuario) => {
    console.log("✅ Iniciando sesión:", datosUsuario);
    setUsuario(datosUsuario);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  const logout = () => {
    console.log("🚪 Cerrando sesión...");
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
