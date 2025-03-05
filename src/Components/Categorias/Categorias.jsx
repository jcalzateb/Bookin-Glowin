import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../../Services/categoriasService";
import {
  ContenedorCategorias,
  ListaCategorias,
  CategoriaItem,
  ImagenCategoria,
} from "./Categorias.styled";

const Categorias = ({ setCategoriaSeleccionada }) => {
  const navigate = useNavigate();
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
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        Categorías
      </Typography>

      <ListaCategorias>
        {categorias.map((categoria) => (
          <CategoriaItem
            key={categoria.id}
            onClick={() => setCategoriaSeleccionada(categoria.nombre)}
          >
            <ImagenCategoria src={categoria.urlImagen} alt={categoria.nombre} />
            <Typography
              variant="h5"
              sx={{
                marginTop: "5px",
                padding: "10px",
                textTransform: "capitalize",
              }}
            >
              {categoria.nombre}
            </Typography>
          </CategoriaItem>
        ))}
      </ListaCategorias>
    </ContenedorCategorias>
  );
};

export default Categorias;
