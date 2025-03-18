import styled from "styled-components";
import { Box, Typography } from "@mui/material";

export const ContenedorFooter = styled(Box)`
  background: linear-gradient(to right, #000, #1c1c1e);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #000;
  margin-top: auto;
  position: relative;
  bottom: 0;
`;

export const TextoFooter = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
`;

export const LogoFooter = styled.img`
  height: 50px;
  margin-right: 20px;
`;

export const RedesSociales = styled.div`
  display: flex;
  gap: 15px;
`;

export const IconoRedSocial = styled.a`
  color: #ffffff;
  font-size: 20px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

export const VentanaEmergente = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  color: #000;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 300px;
`;

export const BotonCerrar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

export const ContenidoCompartir = styled.div`
  text-align: center;
`;

export const BotonRedSocial = styled.a`
  display: inline-block;
  margin: 10px 5px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: #0056b3;
  }
`;