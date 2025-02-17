import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import unasImg from "../assets/categorias/unas.png";
import pestanasImg from "../assets/categorias/pestanas.png";
import cabelloImg from "../assets/categorias/cabello.png";
import cejasImg from "../assets/categorias/cejas.png";
import facialImg from "../assets/categorias/facial.png";
import combosImg from "../assets/categorias/combos.png";

const CategoriaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
  cursor: pointer; /* Hace que el cursor cambie al pasar por encima */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1); /* Pequeño zoom al pasar el mouse */
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #f5f5f5;
  }

  span {
    margin-top: 8px;
    font-weight: bold;
  }
`;

const Categorias = () => {

  const navigate = useNavigate();

  const categorias = [
    { nombre: "Uñas", img: unasImg, ruta: "/categoria/unas" },
    { nombre: "Pestañas", img: pestanasImg, ruta: "/categoria/pestanas" },
    { nombre: "Cabello", img: cabelloImg, ruta: "/categoria/cabello" },
    { nombre: "Cejas", img: cejasImg, ruta: "/categoria/cejas" },
    { nombre: "Facial", img: facialImg, ruta: "/categoria/facial" },
    { nombre: "Combos", img: combosImg, ruta: "/categoria/combos" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
        width: "100%",
        padding: "40px 20px",
      }}
    >
      {/* Título */}
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
      >
        Categorías
      </Typography>

      {/* Lista de Categorías */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {categorias.map((categoria) => (
          <CategoriaItem
            key={categoria.nombre}
            onClick={() => navigate(categoria.ruta)} // Redirección al hacer clic
          >
            <img src={categoria.img} alt={categoria.nombre} />
            <span>{categoria.nombre}</span>
          </CategoriaItem>
        ))}
      </Box>
    </Box>
  );
};

export default Categorias;
