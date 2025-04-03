import styled from "styled-components";
import { Box, Button, IconButton, Typography, Rating } from "@mui/material";

export const ContenedorHistorial = styled.div`
  background-color: #2d0363;
  padding: 80px 0 0 0;
  width: 100%;
  margin: 0 auto;
`;

export const EncabezadoDetalle = styled.div`
  background-color: #2d0363;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: #f6ebf9;
  padding: 10px 50px;
  margin-bottom: 20px;
`;

export const BotonRetroceso = styled(IconButton)`
  border-radius: 50% !important;
  padding: 6px !important;
  margin-right: 5px !important;

  &:hover {
    color: #9747ff !important;
  }
  &:active {
    color: #530eae !important;
  }
`;

export const TituloHistorial = styled.h2`
  text-align: center;
  background-color: #2d0363;
  color: #f6ebf9;
  padding: 10px;
`;

export const Bloque = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 30px;
  @media (max-width: 600px) {
    padding: 5px;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  border-radius: 25px;
  overflow: hidden;
  background-color: #2d0363;
  overflow-x: auto;

  @media (max-width: 1080px) {
    padding: 10px 0;
  }
`;

export const TableFondo = styled.table`
  border-collapse: collapse !important;
`;

export const TableHead = styled.thead`
  width: 100%;
  background-color: #2d0363;
  color: white;
`;

export const TableCell = styled.th`
  width: 10%;
  padding: 12px;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px solid #ddd;
  @media (max-width: 1080px) {
    font-size: 14px;
    &:nth-child(1),
    &:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 820px) {
    &:nth-child(4),
    &:nth-child(6),
    &:nth-child(7) {
      display: none;
    }
  }
  @media (max-width: 600px) {
    font-size: 12px;
    &:nth-child(9) {
      display: none;
    }
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgb(219, 219, 219);
  }
`;

export const Cell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #666;
  text-align: center;
  @media (max-width: 1080px) {
    font-size: 14px;
    &:nth-child(1),
    &:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 820px) {
    &:nth-child(4),
    &:nth-child(6),
    &:nth-child(7) {
      display: none;
    }
  }
  @media (max-width: 600px) {
    font-size: 12px;
    &:nth-child(9) {
      display: none;
    }
  }
`;

export const TableBody = styled.tbody`
  background: rgb(199, 199, 199);
  color: #2d0363;
`;

export const ImagenServicio = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

export const Acciones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonPuntuar = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #2d0363;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  &:hover {
    background-color: #9747ff;
  }
`;

export const ContenedorPaginacion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0 12px 0;
  gap: 20px;
  align-items: baseline;
`;

export const BotonPagina = styled.button`
  min-width: 40px;
  height: 40px;
  background: transparent;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  text-transform: none;

  &:hover {
    background: transparent;
    color: #9747ff;
  }

  &:disabled {
    background: transparent;
    color: #a0a0a0;
  }
`;
