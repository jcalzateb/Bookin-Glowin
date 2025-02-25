import React, { useState } from "react";
import Categorias from "../Components/Categorias/Categorias";
import Buscador from "../Components/Buscador/Buscador";
import ProductoDestacado from "../Components/ProductoDestacado/ProductoDestacado";
import ListaProductos from "../Components/ListaProductos/ListaProductos";

const Inicio = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  //hacer scroll hasta la lista de productos
  const scrollToListaProductos = () => {
    const listaProductos = document.getElementById("lista-productos");
    if (listaProductos) {
      window.scrollTo({
        top: listaProductos.offsetTop - 20, // Ajuste opcional
        behavior: "smooth",
      });
    }
  };

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
    scrollToListaProductos();
  };

  return (
    <div>
      <Buscador />
      <Categorias setCategoriaSeleccionada={handleCategoriaSeleccionada} />
      <ProductoDestacado />
      <ListaProductos categoriaSeleccionada={categoriaSeleccionada} />
    </div>
  );
};

export default Inicio;
