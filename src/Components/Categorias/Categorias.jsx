import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ContenedorCategorias,
  ListaCategorias,
  CategoriaItem,
} from "./Categorias.styled";

import unasImg from "../../assets/categorias/unas.png";
import pestanasImg from "../../assets/categorias/pestanas.png";
import cabelloImg from "../../assets/categorias/cabello.png";
import cejasImg from "../../assets/categorias/cejas.png";
import facialImg from "../../assets/categorias/facial.png";
import combosImg from "../../assets/categorias/combos.png";

const Categorias = () => {
  const navigate = useNavigate();

  const categorias = [
    { nombre: "Uñitas", img: unasImg, ruta: "/categoria/unas" },
    { nombre: "Pestañas", img: pestanasImg, ruta: "/categoria/pestanas" },
    { nombre: "Cabello", img: cabelloImg, ruta: "/categoria/cabello" },
    { nombre: "Cejas", img: cejasImg, ruta: "/categoria/cejas" },
    { nombre: "Cuidados", img: facialImg, ruta: "/categoria/facial" },
    { nombre: "Hombres", img: combosImg, ruta: "/categoria/combos" },
  ];

  return (
    <ContenedorCategorias>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "italic",
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        Categorías
      </Typography>

      <ListaCategorias>
        {categorias.map((categoria) => (
          <CategoriaItem
            key={categoria.nombre}
            onClick={() => navigate(categoria.ruta)}
          >
            <img src={categoria.img} alt={categoria.nombre} />
            <Typography
              variant="h5"
              sx={{
                marginTop: "5px",
                padding: "10px",
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
