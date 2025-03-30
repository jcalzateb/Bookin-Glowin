import styled from "styled-components";
import { Box, Button } from "@mui/material";

export const Contenedor = styled.div`
  padding: 20px;
  background-color: #f6ebf9;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 960px) {
    padding: 15px;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const TituloSeccion = styled.h2`
  font-size: 42px;
  font-weight: bold;
  color: #2d0363;
  margin: 20px 25px;
  overflow: hidden;
  text-align: center;
`;

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

export const TarjetaProducto = styled(Box)`
  position: relative;
  display: flex;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 820px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const CorazonFavorito = styled(Box)`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  color: ${(props) => (props.$favorito ? "red" : "gray")};
  transition: color 0.3s;
  font-size: 24px;
  &:hover {
    color: red;
  }
`;

export const ImagenProducto = styled.img`
  width: 45%;
  height: 230px;
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

export const ContenidoProducto = styled(Box)`
  width: 55%;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 14px 8px 14px;
  text-align: left;
  gap: 2px;
  @media (max-width: 820px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

export const TituloProducto = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #2d0363;
`;

export const CategiraProducto = styled.h6`
  font-size: 14px;
  color: rgb(58, 58, 58);
  font-weight: italic;
  margin-bottom: 10px;
`;

export const DescripcionProducto = styled.p`
  font-size: 14px;
  color: #333;
  max-height: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;
export const Valoracion = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const PuntuacionProducto = styled.p`
  font-size: 12px;
  color: #2d0363;
  max-height: 60px;
`;

export const BotonVerMas = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  text-transform: none !important;
  border-radius: 6px !important;
  padding: 6px 12px !important;
  margin-bottom: 4px !important;
  &:hover {
    background-color: #530eae !important;
  }
`;

export const ContenedorPaginacion = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 20px 0;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 820px) {
    gap: 4px;
  }

  @media (max-width: 600px) {
    gap: 4px;
  }
`;

export const BotonPagina = styled(Button)`
  min-width: 40px;
  height: 40px;
  background: ${({ $activo }) =>
    $activo ? "#2d0363" : "transparent"} !important;
  color: ${({ $activo }) => ($activo ? "white" : "#2d0363")} !important;
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

export const ContenedorFiltro = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px auto;
  padding: 5px;
  background: transparent;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  gap: 16px;
  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const TextoFiltro = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #2d0363;
`;

export const SelectCategoria = styled.select`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  width: 100%;
  color: #333;
  cursor: pointer;

  &:focus {
    border-color: #2d0363;
    outline: none;
  }

  option {
    padding: 8px;
  }

  @media (max-width: 600px) {
    padding: 8px 10px;
  }
`;

export const CheckboxFavoritos = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #2d0363;
  font-weight: 400;
  gap: 8px;

  input {
    width: 18px;
    height: 18px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const BotonEliminarFiltro = styled(Button)`
  background: transparent !important;
  border: 1px solid rgba(151, 71, 255, 0.36) !important;
  color: #9747ff !important;
  font-weight: bold !important;
  margin-left: 5px !important;
  text-transform: none !important;
  padding: 2px 8px !important;
  border-radius: 8px !important;

  &:hover {
    background: #530eae !important;
    color: white !important;
  }

  @media (max-width: 600px) {
    padding: 5px 10px;
  }
`;
