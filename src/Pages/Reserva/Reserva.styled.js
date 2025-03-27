import styled from "@emotion/styled";
import { Button, Typography, Box } from "@mui/material";

export const ContenedorReserva = styled(Box)`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  margin: 60px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const TituloReserva = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const SubtituloReserva = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #555;
`;

export const DetallesReserva = styled(Box)`
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DetalleItem = styled(Box)`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BotonReserva = styled(Button)`
  width: 100%;
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #1565c0;
  }
`;

export const ErrorMessage = styled(Typography)`
  color: red;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
`;

export const SelectEmpleado = styled("select")`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: #fff;
  color: #555;
  &:focus {
    border-color: #1976d2;
    outline: none;
  }
`;

export const OptionEmpleado = styled("option")`
  padding: 8px;
  font-size: 1rem;
`;
