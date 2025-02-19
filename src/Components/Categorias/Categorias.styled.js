import styled from "styled-components";
import { Box } from "@mui/material";

// Contenedor principal
export const ContenedorCategorias = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  width: 100%;
  padding: 40px 20px;
`;

// Contenedor de la lista de categorías
export const ListaCategorias = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 900px;
  width: 100%;
`;

// Estilos para cada categoría
export const CategoriaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
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
