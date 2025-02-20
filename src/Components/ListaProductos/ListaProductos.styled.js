import styled from "styled-components";
import { Box, Button } from "@mui/material";

// Contenedor general de la lista de productos
export const ContenedorLista = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 20px 40px;
  }
  @media (max-width: 600px) {
    padding: 20px 30px;
  }
`;

// Tarjeta de cada producto
export const TarjetaProducto = styled(Box)`
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
  @media (max-width: 820px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// Imagen del producto, ocupa el 40%
export const ImagenProducto = styled.img`
  width: 40%;
  height: 180px;
  object-fit: cover;

  @media (max-width: 820px) {
    width: 100%;
    height: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 200px;
  }
`;

// Contenido del producto, ocupa el 60%
export const ContenidoProducto = styled(Box)`
  width: 60%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 30px;
  text-align: left;

  @media (max-width: 820px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

// Título del producto
export const TituloProducto = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  max-height: 45px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// Descripción del producto
export const DescripcionProducto = styled.p`
  font-size: 14px;
  color: #666;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
`;

export const BotonVerMas = styled(Button)`
  background-color: #9747ff !important;
  color: white !important;
  font-weight: bold !important;
  text-transform: none !important;
  border-radius: 6px !important;
  padding: 6px 12px !important;

  &:hover {
    background-color: #530eae !important;
  }
`;

// Contenedor de paginación
export const ContenedorPaginacion = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 30px 0;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 820px) {
    gap: 4px;
  }

  @media (max-width: 600px) {
    gap: 4px;
  }
`;

// Botones de paginación
export const BotonPagina = styled(Button)`
  min-width: 35px;
  height: 35px;
  background: ${({ $activo }) =>
    $activo ? "#9747FF" : "transparent"} !important;
  color: ${({ $activo }) => ($activo ? "white" : "#9747FF")} !important;
  border: 1px solid #9747ff !important;
  border-radius: 8px;
  font-size: 14px;
  text-transform: none;

  &:hover {
    background: #530eae !important;
    color: white !important;
  }

  &:disabled {
    background: #e0e0e0 !important;
    color: #a0a0a0 !important;
    border: none !important;
  }

  @media (max-width: 820px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

export const ControlesPaginacion = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 400px) {
    width: 100%;
    justify-content: space-between;
  }
`;
