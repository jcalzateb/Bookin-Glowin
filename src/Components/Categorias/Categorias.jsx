import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
//import { useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../../Services/categoriasService";
import {
  ContenedorCategorias,
  TituloSeccion,
  ListaCategorias,
  CategoriaItem,
  ImagenCategoria,
} from "./Categorias.styled";
import { obtenerNombreCategoria } from "../../Utils/utils";

const Categorias = ({ setCategoriaSeleccionada }) => {
  //const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  return (
    <ContenedorCategorias>
      <TituloSeccion>Categorías</TituloSeccion>

      <ListaCategorias>
        {categorias.map((categoria) => (
          <CategoriaItem
            key={categoria.id}
            onClick={() => setCategoriaSeleccionada(categoria.nombre)}
          >
            <ImagenCategoria src={categoria.urlImagen} alt={categoria.nombre} />
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                marginTop: "5px",
                padding: "10px",
                textTransform: "capitalize",
              }}
            >
              {obtenerNombreCategoria(categoria.nombre)}
            </Typography>
          </CategoriaItem>
        ))}
      </ListaCategorias>
    </ContenedorCategorias>
  );
};

export default Categorias;
