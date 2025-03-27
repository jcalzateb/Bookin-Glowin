import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, CircularProgress } from "@mui/material";
import { realizarReserva } from "../../Services/reservasService";
import { obtenerServicioPorId } from "../../Services/serviciosService";
import { obtenerUsuarioPorId } from "../../Services/usuariosService";
import { obtenerEmpleados } from "../../Services/empleadosService";
import {
  ContenedorReserva,
  TituloReserva,
  SubtituloReserva,
  DetallesReserva,
  DetalleItem,
  BotonReserva,
  ErrorMessage,
  SelectEmpleado,
  OptionEmpleado,
} from "./Reserva.styled";

const Reserva = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { servicioId, turnoId, fecha, hora } = location.state || {};
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [servicio, setServicio] = useState(null);
  const [turno, setTurno] = useState({});

  useEffect(() => {
    if (servicioId && turnoId && hora && fecha) {
      setTurno({ id: turnoId, hora: hora, fecha: fecha });
      obtenerServicioPorId(servicioId)
        .then((data) => {
          setServicio(data);
        })
        .catch((err) => setError("Error al cargar el servicio"));
    }
  }, [servicioId, turnoId, hora, fecha]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    console.log("Verificando usuario:", usuario);

    if (usuario && usuario.id) {
      obtenerUsuarioPorId(usuario.id)
        .then((data) => {
          setUsuario(data);
        })
        .catch((err) => setError("Error al cargar la información del usuario"));
    } else {
      setError("No se ha encontrado el ID del usuario.");
    }
  }, []);
  useEffect(() => {
    obtenerEmpleados()
      .then((data) => {
        setEmpleados(data);
        console.log("Empleados cargados:", data);
      })
      .catch((err) => setError("Error al cargar los empleados"));
  }, []);

  const confirmarReserva = async () => {
    console.log("usuarioId desde localStorage:", usuario);
    if (!usuario) {
      setError("No se pudo obtener la información del usuario");
      return;
    }
    const horaConSegundos = `${turno.hora}:00`;
    setIsLoading(true);
    console.log("hora", hora);
    console.log("turno", turno);
    try {
      const reservaData = {
        idCliente: usuario.id,
        idServicio: servicio.id,
        idEmpleado: empleadoSeleccionado.id,
        fecha: fecha,
        hora: horaConSegundos,
        estado: "CONFIRMADA",
      };
      console.log("reservaData", reservaData);
      console.log("hora", hora);
      console.log("turno", turno);
      await realizarReserva(reservaData);
      navigate("/reserva-confirmada");
    } catch (err) {
      setError("Hubo un error al realizar la reserva");
    } finally {
      setIsLoading(false);
    }
  };

  const manejarSeleccionEmpleado = (event) => {
    const empleadoId = event.target.value;
    console.log("Empleado seleccionado:", empleadoId);

    const empleado = empleados.find((emp) => emp.id === parseInt(empleadoId));
    setEmpleadoSeleccionado(empleado);
    console.log("Empleado encontrado:", empleado);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <ErrorMessage variant="h6" color="error">
        {error}
      </ErrorMessage>
    );
  }

  return (
    <ContenedorReserva>
      <TituloReserva variant="h4">Resumen de la Reserva</TituloReserva>
      <DetallesReserva>
        <SubtituloReserva variant="h6">Servicio</SubtituloReserva>
        <DetalleItem>
          <Typography variant="body1">
            {servicio ? servicio.nombre : "Cargando..."}
          </Typography>
        </DetalleItem>
        <SubtituloReserva variant="h6">Detalles del Turno</SubtituloReserva>
        <DetalleItem>
          <Typography variant="body1">Fecha: {turno.fecha}</Typography>
          <Typography variant="body1">Hora: {turno.hora}</Typography>
        </DetalleItem>
        <div>
          <SubtituloReserva variant="h6">
            Seleccione un Empleado
          </SubtituloReserva>
          <SelectEmpleado
            onChange={manejarSeleccionEmpleado}
            value={empleadoSeleccionado?.id || ""}
          >
            <OptionEmpleado value="" disabled>
              Seleccione un empleado
            </OptionEmpleado>
            {empleados.map((empleado) => (
              <OptionEmpleado key={empleado.id} value={empleado.id}>
                {empleado.nombre} {empleado.apellido} ({empleado.tipoJornada})
              </OptionEmpleado>
            ))}
          </SelectEmpleado>
        </div>
      </DetallesReserva>

      <BotonReserva
        variant="contained"
        onClick={confirmarReserva}
        disabled={isLoading || !empleadoSeleccionado}
      >
        Confirmar Reserva
      </BotonReserva>
    </ContenedorReserva>
  );
};

export default Reserva;
