import React, { useState } from "react";
import Categorias from "../Components/Categorias/Categorias";
import Buscador from "../Components/Buscador/Buscador";
import ProductoDestacado from "../Components/ProductoDestacado/ProductoDestacado";
import ListaProductos from "../Components/ListaProductos/ListaProductos";
import Header from "../Components/Header/Header";

const Inicio = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const scrollToListaProductos = () => {
    const listaProductos = document.getElementById("lista-productos");
    if (listaProductos) {
      window.scrollTo({
        top: listaProductos.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
    scrollToListaProductos();
  };

  const handleFavoritos = (fav) => {
    setMostrarFavoritos(fav);
    scrollToListaProductos();
  };

  return (
    <div>
      <Header setMostrarFavoritos={handleFavoritos} />
      <Buscador />
      <Categorias setCategoriaSeleccionada={handleCategoriaSeleccionada} />
      <ProductoDestacado />
      <ListaProductos
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        mostrarFavoritos={mostrarFavoritos}
        setMostrarFavoritos={setMostrarFavoritos}
      />
    </div>
  );
};

export default Inicio;
