import React from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {
  ContenedorConfirmacion,
  TituloConfirmacion,
  SubtituloConfirmacion,
  BotonInicio,
} from "./ReservaConfirmada.styled";

const ReservaConfirmada = () => {
  const navigate = useNavigate();

  return (
    <ContenedorConfirmacion>
      <CheckCircleOutlineIcon style={{ color: "#2d0363", fontSize: 80, marginBottom: 20 }} />
      <TituloConfirmacion variant="h4">¡Reserva Confirmada!</TituloConfirmacion>
      <SubtituloConfirmacion variant="body1">
        Tu reserva ha sido confirmada con éxito. Recibirás un correo electrónico con los detalles de tu reserva. 
        Gracias por elegirnos, ¡esperamos brindarte una excelente experiencia!
      </SubtituloConfirmacion>

      <BotonInicio
        variant="contained"
        onClick={() => navigate("/")}
      >
        Volver al Inicio
      </BotonInicio>
    </ContenedorConfirmacion>
  );
};

export default ReservaConfirmada;
