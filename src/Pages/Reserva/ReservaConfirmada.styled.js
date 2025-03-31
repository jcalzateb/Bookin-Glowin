import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";

export const ContenedorConfirmacion = styled(Box)`
  background-color: #f6ebf9;
  min-height: 100vh;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TituloConfirmacion = styled(Typography)`
  font-size: 42px !important;
  font-weight: bold !important;
  color: #2d0363 !important;
  margin-bottom: 20px !important;
`;

export const SubtituloConfirmacion = styled(Typography)`
  font-size: 18px !important;
  max-width: 600px;
  margin-bottom: 40px !important;
  color: #333 !important;
  line-height: 1.6 !important;
`;

export const BotonInicio = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  font-weight: 500 !important;
  text-transform: none !important;
  padding: 12px 30px !important;
  border-radius: 8px !important;
  font-size: 16px !important;

  &:hover {
    background-color: #530eae !important;
  }
`;
