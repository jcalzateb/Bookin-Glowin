import styled from "styled-components";
import { Box } from "@mui/material";

export const ContenedorCategorias = styled(Box)`
  background-color: #2d0363;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 40px 20px;
  color: white;

  @media (min-width: 760px) and (max-width: 1000px) {
    padding: 50px 120px;
  }

  @media (max-width: 600px) {
    padding: 30px 15px;
  }
`;

export const TituloSeccion = styled.h2`
  font-size: 42px;
  font-weight: bold;
  color: #f6ebf9;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: center;
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
  width: 130px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: white;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    background-color: rgba(0, 0, 0, 0.5);
    border: 5px solid rgba(74, 26, 119, 0.21);
  }
`;

export const ImagenCategoria = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid rgba(134, 134, 134, 0.3);
`;
