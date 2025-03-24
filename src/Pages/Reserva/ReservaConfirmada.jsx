import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReservaConfirmada = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" color="primary">
        ¡Reserva Confirmada!
      </Typography>
      <Typography variant="body1">
        Tu reserva ha sido confirmada con éxito.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
};

export default ReservaConfirmada;
