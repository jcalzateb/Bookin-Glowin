import React from "react";
import Categorias from "../Components/Categorias/Categorias";
import Buscador from "../Components/Buscador/Buscador";
import ProductoDestacado from "../Components/ProductoDestacado/ProductoDestacado";
import ListaProductos from "../Components/ListaProductos/ListaProductos";

const Inicio = () => {
  return (
    <div>
      <Buscador />
      <Categorias />
      <ProductoDestacado />
      <ListaProductos />
    </div>
  );
};

export default Inicio;
