import React from "react";
import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import {
  ContenedorMensaje,
  IconoMensaje,
  BotonConfirmar,
  BotonCancelar,
} from "./MensajeModal.styled";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const MensajeModal = ({ abierto, tipo, mensaje, onConfirmar, onCancelar }) => {
  const iconos = {
    error: <ErrorIcon style={{ color: "red", fontSize: 40 }} />,
    confirmacion: <CheckCircleIcon style={{ color: "green", fontSize: 40 }} />,
    eliminar: <DeleteIcon style={{ color: "red", fontSize: 40 }} />,
  };

  const titulos = {
    error: "ERROR",
    confirmacion: "PRODUCTO CREADO CON ÉXITO",
    eliminar: "ELIMINAR",
  };

  return (
    <Dialog open={abierto} onClose={onCancelar} maxWidth="xs" fullWidth>
      <DialogContent>
        <ContenedorMensaje>
          <IconoMensaje>{iconos[tipo]}</IconoMensaje>
          <Typography
            variant="h6"
            fontWeight="bold"
            color={tipo === "error" ? "red" : "black"}
          >
            {titulos[tipo]}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {mensaje}
          </Typography>
          <div>
            {tipo !== "error" && (
              <BotonConfirmar onClick={onConfirmar}>Confirmar</BotonConfirmar>
            )}
            <BotonCancelar onClick={onCancelar}>
              {tipo === "error" ? "Editar" : "Cancelar"}
            </BotonCancelar>
          </div>
        </ContenedorMensaje>
      </DialogContent>
    </Dialog>
  );
};

export default MensajeModal;
