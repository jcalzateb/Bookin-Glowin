import styled from "styled-components";
import { Box, Typography } from "@mui/material";

// Contenedor principal del Footer
export const ContenedorFooter = styled(Box)`
  background: linear-gradient(to right, #000, #1c1c1e);
  color: #ffffff;
  text-align: center;
  padding: 20px;
  border-top: 2px solid #000;
  margin-top: 10px;
`;

// Texto del Footer
export const TextoFooter = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
`;
