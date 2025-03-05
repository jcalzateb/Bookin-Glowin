import styled from "styled-components";
import { Box } from "@mui/material";

export const ContenedorCategorias = styled(Box)`
  background-color: #1c1c1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  color: white;

  @media (min-width: 760px) and (max-width: 1000px) {
    padding: 40px 120px;
  }
`;

export const ListaCategorias = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  max-width: 900px;
  width: 100%;
`;

export const CategoriaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
  cursor: pointer;
  transition: transform 0.2s;
  color: white;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    background-color: rgb(0, 0, 0);
  }
`;

export const ImagenCategoria = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(134, 134, 134, 0.2);
`;
