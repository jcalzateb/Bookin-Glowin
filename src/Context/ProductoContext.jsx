import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const ProductoContext = createContext();

// Proveedor del contexto
export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("https://api.example.com/productos").then((respuesta) => {
      setProductos(respuesta.data);
    });
  }, []);

  return (
    <ProductoContext.Provider value={{ productos }}>
      {children}
    </ProductoContext.Provider>
  );
};
