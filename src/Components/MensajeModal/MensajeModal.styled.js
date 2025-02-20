import styled from "styled-components";
import { Box, Button } from "@mui/material";

// Contenedor principal del mensaje
export const ContenedorMensaje = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  gap: 15px;
`;

// Icono del mensaje
export const IconoMensaje = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

// Botón de confirmar (verde)
export const BotonConfirmar = styled(Button)`
  background: #28a745 !important;
  color: white !important;
  font-size: 14px !important;
  font-weight: bold !important;
  margin: 5px !important;

  &:hover {
    background: #218838 !important;
  }
`;

// Botón de cancelar (rojo)
export const BotonCancelar = styled(Button)`
  background: #dc3545 !important;
  color: white !important;
  font-size: 14px !important;
  font-weight: bold !important;
  margin: 5px !important;

  &:hover {
    background: #c82333 !important;
  }
`;
