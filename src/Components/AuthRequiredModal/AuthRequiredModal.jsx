import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import styled from "styled-components";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const ModalContainer = styled(Box)`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px !important;
  width: 100%;
  max-width: 400px;
  height: 350px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Contenedor1 = styled(Box)``;
const Contenedor2 = styled(Box)``;

const ModalTitle = styled(DialogTitle)`
  font-size: 24px !important;
  font-weight: 600 !important;
  padding: 0 !important;
  color: #2d0363;
  margin-bottom: 2px !important;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.h1.fontFamily}!important;
`;

const ModalText = styled(Typography)`
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #2d0363;
  margin-bottom: 16px;
`;

const ModalButton = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  text-transform: none !important;
  padding: 10px 20px !important;
  border-radius: 6px !important;
  font-weight: bold !important;
  align-items: center !important;
  width: 100%;
  &:hover {
    background-color: #530eae !important;
  }
`;

const EnlaceRegistro = styled(Typography)`
  color: ${({ theme }) => theme.palette.detalle.main};
  cursor: pointer;
  text-decoration: underline;
  margin: 3px !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  font-family: ${({ theme }) => theme.typography.button.fontFamily}!important;
  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.palette.botones.hovered} !important;
  }
`;

const AuthRequiredModal = ({ open, onClose, actionType }) => {
  const navigate = useNavigate();

  const handleIniciarSesion = () => {
    navigate("/ingresar");
    onClose();
  };

  const handleRegistrarse = () => {
    navigate("/registrar");
    onClose();
  };

  const getModalText = () => {
    if (actionType === "favoritos") {
      return (
        <ModalText>
          Para agregar este servicio a tus favoritos, es necesario que inicies
          sesión. Si no tienes una cuenta, puedes registrarte ahora.
        </ModalText>
      );
    } else if (actionType === "reserva") {
      return (
        <ModalText>
          Para continuar con tu reserva, es necesario que inicies sesión. Si no
          tienes una cuenta, puedes registrarte ahora.
        </ModalText>
      );
    } else {
      return (
        <ModalText>
          Para realizar esta acción, es necesario que inicies sesión. Si no
          tienes una cuenta, puedes registrarte ahora.
        </ModalText>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
        },
      }}
    >
      <ModalContainer>
        <Contenedor1>
          <IconButton
            sx={{ color: "#2d0363", fontSize: 60, padding: " 0 !important" }}
            aria-label="Auth"
            disabled
          >
            <LockOutlinedIcon
              sx={{
                fontSize: "50px",
                padding: " 0 !important",
                color: "#2d0363",
              }}
            />
          </IconButton>
          <ModalTitle>Inicio de sesión requerido</ModalTitle>
        </Contenedor1>
        <Contenedor2>{getModalText()}</Contenedor2>

        <DialogActions>
          <ModalButton onClick={handleIniciarSesion}>
            Iniciar Sesión
          </ModalButton>
        </DialogActions>
        <EnlaceRegistro onClick={handleRegistrarse}>
          ¿No tienes cuenta? Regístrate aquí
        </EnlaceRegistro>
      </ModalContainer>
    </Dialog>
  );
};

export default AuthRequiredModal;
