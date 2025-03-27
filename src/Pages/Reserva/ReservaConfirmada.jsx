import React from "react";
import { useNavigate } from "react-router-dom";

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
      <TituloConfirmacion variant="h4">¡Reserva Confirmada!</TituloConfirmacion>
      <SubtituloConfirmacion variant="body1">
        Tu reserva ha sido confirmada con éxito. Gracias por elegirnos.
      </SubtituloConfirmacion>

      <BotonInicio
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Volver al Inicio
      </BotonInicio>
    </ContenedorConfirmacion>
  );
};

export default ReservaConfirmada;
