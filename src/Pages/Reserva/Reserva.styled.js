import styled from "styled-components";
import { Box, Button, Typography, Radio, FormControlLabel } from "@mui/material";

export const ContenedorPrincipal = styled(Box)`
  background-color: #f6ebf9;
  min-height: 100vh;
  padding: 80px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TituloReserva = styled(Typography)`
  font-size: 42px !important;
  font-weight: bold !important;
  color: #2d0363 !important;
  margin: 20px 0 !important;
  text-align: center !important;
`;

export const ContenedorReserva = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const SeccionIzquierda = styled(Box)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SeccionDerecha = styled(Box)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Seccion = styled(Box)`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const TituloSeccion = styled(Typography)`
  font-size: 20px !important;
  font-weight: bold !important;
  color: #2d0363 !important;
  margin-bottom: 15px !important;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

export const DatosUsuarioForm = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const CampoFormulario = styled(Box)`
  margin-bottom: 15px;
`;

export const LabelCampo = styled(Typography)`
  font-weight: 600 !important;
  margin-bottom: 5px !important;
  color: #555 !important;
`;

export const ValorCampo = styled(Typography)`
  font-size: 16px !important;
  color: #333 !important;
`;

export const TarjetaServicio = styled(Box)`
  display: flex;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  margin: 15px 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ImagenServicio = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 100%;
    height: 180px;
  }
`;

export const ContenidoServicio = styled(Box)`
  padding: 15px;
  flex: 1;
`;

export const TituloServicio = styled(Typography)`
  font-size: 18px !important;
  font-weight: bold !important;
  color: #2d0363 !important;
  margin-bottom: 5px !important;
`;

export const DetalleServicio = styled(Typography)`
  font-size: 14px !important;
  color: #555 !important;
  margin-bottom: 5px !important;
`;

export const ContenedorEmpleados = styled(Box)`
  margin-top: 20px;
`;

export const ListaEmpleados = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

export const TarjetaEmpleado = styled(Box)`
  border: 2px solid ${({ $seleccionado }) => ($seleccionado ? '#9747ff' : 'transparent')};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $seleccionado }) => ($seleccionado ? 'rgba(151, 71, 255, 0.1)' : '#f9f9f9')};

  &:hover {
    border-color: #9747ff;
    transform: translateY(-2px);
  }
`;

export const ImagenEmpleado = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const NombreEmpleado = styled(Typography)`
  font-weight: bold !important;
  text-align: center !important;
  color: #2d0363 !important;
`;

export const ProfesionEmpleado = styled(Typography)`
  font-size: 14px !important;
  color: #666 !important;
  text-align: center !important;
`;

export const BotonAleatorio = styled(Button)`
  background-color: #f3e5f9 !important;
  color: #2d0363 !important;
  margin-top: 10px !important;
  text-transform: none !important;
  font-weight: bold !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;

  &:hover {
    background-color: #e3c5f9 !important;
  }
`;

export const ContenedorMonto = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 15px;
`;

export const TextoMonto = styled(Typography)`
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #333 !important;
`;

export const ValorMonto = styled(Typography)`
  font-size: 24px !important;
  font-weight: bold !important;
  color: #2d0363 !important;
`;

export const ContenedorMetodosPago = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  margin-top: 10px;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const OpcionPago = styled(FormControlLabel)`
  margin: 0 !important;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  flex: 1;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3e5f9;
  }

  .MuiFormControlLabel-label {
    font-weight: 500 !important;
    color: #333 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-basis: 45%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const RadioPago = styled(Radio)`
  color: #9747ff !important;
  
  &.Mui-checked {
    color: #2d0363 !important;
  }
`;

export const ContenedorBotones = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
max-width: 1200px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const BotonConfirmar = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  font-weight: 500 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  min-width: 180px !important;

  &:hover {
    background-color: #530eae !important;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const BotonCancelar = styled(Button)`
  background-color: transparent !important;
  color: #2d0363 !important;
  font-weight: 500 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border: 1px solid #2d0363 !important;
  border-radius: 8px !important;
  min-width: 180px !important;

  &:hover {
    background-color: rgba(45, 3, 99, 0.1) !important;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const LogoPago = styled.img`
  height: 24px;
  width: auto;
  max-width: 60px;
  object-fit: contain;
`;

export const IconoMetodoPago = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  @media (max-width: 960px) {
    flex-direction: row;
  }
`;
