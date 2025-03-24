import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, CircularProgress } from "@mui/material";
import { realizarReserva } from "../../Services/reservasService";
import { obtenerServicioPorId } from "../../Services/serviciosService";

const Reserva = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { servicioId, turnoId, fecha } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [servicio, setServicio] = useState(null);
  const [turno, setTurno] = useState({});

  useEffect(() => {
    if (servicioId && turnoId && fecha) {
      setTurno({ id: turnoId, fecha: fecha });
      obtenerServicioPorId(servicioId)
        .then((data) => {
          setServicio(data);
        })
        .catch((err) => setError("Error al cargar el servicio"));
    }
  }, [servicioId, turnoId, fecha]);

  const confirmarReserva = async () => {
    setIsLoading(true);
    try {
      await realizarReserva(servicioId, turnoId, fecha);
      navigate("/reserva-confirmada");
    } catch (err) {
      setError("Hubo un error al realizar la reserva");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4">Resumen de la Reserva</Typography>
      <div>
        <Typography variant="h6">
          Servicio: {servicio ? servicio.nombre : "Cargando..."}
        </Typography>
        <Typography variant="body1">Fecha de reserva: {turno.fecha}</Typography>
        <Typography variant="body1">Hora: {turno.hora}</Typography>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={confirmarReserva}
        disabled={isLoading}
      >
        Confirmar Reserva
      </Button>
    </div>
  );
};

export default Reserva;
