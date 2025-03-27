import styled from "@emotion/styled";
import { Button, Typography, Box } from "@mui/material";

export const ContenedorConfirmacion = styled(Box)`
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const TituloConfirmacion = styled(Typography)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 20px;
`;

export const SubtituloConfirmacion = styled(Typography)`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
`;

export const BotonInicio = styled(Button)`
  width: 100%;
  background-color: #1976d2;
  color: white;
  padding: 12px;
  font-size: 1rem;
  &:hover {
    background-color: #1565c0;
  }
`;
