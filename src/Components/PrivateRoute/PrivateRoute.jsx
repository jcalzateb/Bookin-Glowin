import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Usamos Navigate para redirigir
import { AuthContext } from "../../Context/AuthContext"; // Asegúrate de que esta ruta esté correcta

// PrivateRoute ya no debe ser un Route directamente, sino un wrapper para las rutas protegidas
const PrivateRoute = ({ element: Component, ...rest }) => {
  const { usuario } = useContext(AuthContext); // Obtener el usuario desde el contexto

  // Si el usuario no está autenticado, redirige a la página de login
  if (!usuario) {
    return <Navigate to="/ingresar" replace />;
  }

  return Component; // Si el usuario está autenticado, renderiza el componente de la ruta
};

export default PrivateRoute;
