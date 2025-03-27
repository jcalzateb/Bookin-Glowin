import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import {
  obtenerDisponibilidadMensual,
  obtenerTurnosDisponibles,
} from "../../Services/disponibilidadService";
import { Padding } from "@mui/icons-material";

const CalendarioIcono = styled(IconButton)({
  color: "#2d0363",
  bordeRadius: "50% !important",
  "&:hover": {
    color: "#581ca7",
    backgroundColor: "transparent !important",
  },
});

const ModalContenido = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) !important",
  width: "80% !important",
  maxWidth: "800px !important",
  backgroundColor: "white",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15) !important",
  borderRadius: "8px !important",
  padding: "20px !important",
  alignItems: "center !important",
  textAlign: "center !important",
  "@media (max-width: 786px)": {
    width: "90% !important",
    padding: "35px 20px !important",
  },
});

const CalendarioHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",

  "@media (max-width: 786px)": {
    gap: "8px",
  },
});

const DiaSemana = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold",
  padding: "4px 0 !important",
});

const DiaCelda = styled(Button)(
  ({ disponible, hoy, esMesActual, seleccionado, esPasado }) => ({
    width: "50%",
    height: "50px",
    borderRadius: "5px",
    margin: "1px",
    padding: "0 20px",
    color: !esMesActual
      ? "#bdbdbd"
      : !disponible
      ? "#9c27b0"
      : hoy
      ? "#1976d2"
      : "#000",
    backgroundColor: seleccionado ? "#9c27b0" : "transparent",
    "&:hover": {
      backgroundColor: !disponible ? "rgba(156, 39, 176, 0.08)" : "#e3f2fd",
    },
    "&.Mui-disabled": {
      color: "#bdbdbd",
    },

    "@media (max-width: 786px)": {
      width: "30%px !important",
      height: "30px !important",
      padding: "0 !important",
      fontSize: "12px !important",
    },
  })
);

const TurnoBoton = styled(Button)({
  margin: "4px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#9c27b0",
    color: "white",
  },
  "@media (max-width: 786px)": {
    fontSize: "12px",
  },
});

const CalendarioDisponibilidad = ({ servicioId, onSeleccionTurno }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState({});
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (modalAbierto) {
      cargarDisponibilidadMensual();
    }
  }, [modalAbierto, fechaActual, servicioId]);

  const cargarDisponibilidadMensual = async () => {
    setCargando(true);
    try {
      const anio = fechaActual.getFullYear();
      const mes = fechaActual.getMonth() + 1;
      const disponibilidadPorDia = await obtenerDisponibilidadMensual(
        servicioId,
        anio,
        mes
      );
      setDisponibilidad(disponibilidadPorDia);
      console.log("Disponibilidad por día:", disponibilidadPorDia);
    } catch (err) {
      setError("No se pudo cargar la disponibilidad");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cargarTurnosDisponibles = async (fecha) => {
    setCargando(true);
    try {
      const fechaFormateada = fecha.toISOString().split("T")[0];
      const turnos = await obtenerTurnosDisponibles(
        servicioId,
        fechaFormateada
      );
      setTurnosDisponibles(turnos);
      setFechaSeleccionada(fecha);
      console.log("Turnos disponibles:", turnos);
    } catch (err) {
      console.error("Error al obtener turnos:", err);
      setTurnosDisponibles([]);
    } finally {
      setCargando(false);
    }
  };

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setFechaSeleccionada(null);
    setTurnosDisponibles([]);
  };

  const mesAnterior = () => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(fechaActual.getMonth() - 1);
    setFechaActual(nuevaFecha);
  };

  const mesSiguiente = () => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(fechaActual.getMonth() + 1);
    setFechaActual(nuevaFecha);
  };

  // Seleccionar un turno
  const seleccionarTurno = (turno) => {
    if (onSeleccionTurno && fechaSeleccionada) {
      onSeleccionTurno(fechaSeleccionada, turno);
      cerrarModal();
    }
  };

  // Generar días del calendario
  const generarCalendario = () => {
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    const primerDia = new Date(anio, mes, 1);
    let diaSemana = primerDia.getDay();
    diaSemana = diaSemana === 0 ? 6 : diaSemana - 1; // Ajustar para que lunes sea 0
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Normalizar la hora para comparaciones de fecha

    const dias = [];

    // Días del mes anterior
    for (let i = diaSemana - 1; i >= 0; i--) {
      const dia = new Date(anio, mes, -i);
      dias.push({
        fecha: dia,
        diaMes: dia.getDate(),
        esMesActual: false,
        esPasado: dia < hoy,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= diasEnMes; i++) {
      const dia = new Date(anio, mes, i);
      const fechaStr = dia.toISOString().split("T")[0];
      const horarios = disponibilidad[fechaStr] || [];

      dias.push({
        fecha: dia,
        diaMes: i,
        esMesActual: true,
        esPasado: dia < hoy,
        disponible: horarios.length > 0,
        horarios: horarios,
      });
    }

    // Días del mes siguiente
    const diasRestantes = 7 - (dias.length % 7);
    if (diasRestantes < 7) {
      for (let i = 1; i <= diasRestantes; i++) {
        const dia = new Date(anio, mes + 1, i);
        dias.push({
          fecha: dia,
          diaMes: i,
          esMesActual: false,
          esPasado: dia < hoy,
        });
      }
    }

    return dias;
  };

  const renderizarCalendario = () => {
    const dias = generarCalendario();
    const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return (
      <Box>
        <CalendarioHeader>
          <IconButton onClick={mesAnterior}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {fechaActual.toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <IconButton onClick={mesSiguiente}>
            <ArrowForwardIcon />
          </IconButton>
        </CalendarioHeader>

        <Grid container>
          {/* Cabecera de días */}
          {diasSemana.map((dia) => (
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              item
              xs={12 / 7}
              key={dia}
            >
              <DiaSemana variant="subtitle2">{dia}</DiaSemana>
            </Grid>
          ))}

          {/* Días del calendario */}
          {dias.map((dia, index) => (
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              item
              xs={12 / 7}
              key={index}
            >
              <DiaCelda
                disponible={dia.disponible ? "true" : "false"}
                hoy={
                  dia.fecha.toDateString() === hoy.toDateString()
                    ? "true"
                    : "false"
                }
                // No pasar `esMesActual` como prop al DOM
                seleccionado={
                  fechaSeleccionada &&
                  fechaSeleccionada.toDateString() === dia.fecha.toDateString()
                    ? "true"
                    : "false"
                }
                disabled={dia.esPasado || !dia.disponible || !dia.esMesActual}
                onClick={() =>
                  dia.disponible && cargarTurnosDisponibles(dia.fecha)
                }
                sx={{
                  backgroundColor:
                    dia.disponible && dia.esMesActual && !dia.esPasado
                      ? "#e8f5e9"
                      : !dia.esMesActual
                      ? "transparent"
                      : !dia.disponible
                      ? "rgba(156, 39, 176, 0.12)" // Morado más transparente
                      : "#f5f5f5",
                  color:
                    dia.disponible && dia.esMesActual && !dia.esPasado
                      ? "#2e7d32"
                      : undefined,
                }}
              >
                {dia.diaMes}
                {dia.disponible && dia.esMesActual && !dia.esPasado && (
                  <Box
                    sx={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#transparent",
                      position: "absolute",
                      bottom: "3px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </DiaCelda>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderizarTurnos = () => {
    if (!fechaSeleccionada) {
      return (
        <Box mt={0}>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Selecciona una fecha para ver los turnos disponibles
          </Typography>
        </Box>
      );
    }

    if (cargando) {
      return (
        <Box mt={0} display="flex" justifyContent="center">
          <CircularProgress size={30} />
        </Box>
      );
    }

    if (turnosDisponibles.length === 0) {
      return (
        <Box mt={0}>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No hay turnos disponibles para esta fecha.
          </Typography>
        </Box>
      );
    }

    return (
      <Box mt={0}>
        <Typography variant="h6" gutterBottom>
          Turnos para{" "}
          {fechaSeleccionada.toLocaleDateString("es-ES", { dateStyle: "long" })}
        </Typography>
        <Grid container spacing={1}>
          {turnosDisponibles.map((turno) => (
            <Grid item xs={4} key={turno.id}>
              <TurnoBoton
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => seleccionarTurno(turno)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#9c27b0",
                    color: "white",
                  },
                }}
              >
                {turno.hora}
              </TurnoBoton>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <CalendarioIcono onClick={abrirModal} aria-label="Ver disponibilidad">
        <CalendarMonthIcon />
      </CalendarioIcono>

      <Modal
        open={modalAbierto}
        onClose={cerrarModal}
        aria-labelledby="calendario-disponibilidad"
      >
        <ModalContenido>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start-flex"
            mb={2}
          >
            <IconButton onClick={cerrarModal} size="small">
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">Disponibilidad</Typography>
          </Box>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          {/* Layout horizontal para calendario y turnos */}
          <Grid container spacing={3}>
            {/* Columna del calendario */}
            <Grid item xs={12} md={7}>
              {cargando && !fechaSeleccionada ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="300px"
                >
                  <CircularProgress />
                </Box>
              ) : (
                renderizarCalendario()
              )}
            </Grid>

            {/* Columna de los turnos */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "10px",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {renderizarTurnos()}
              </Box>
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={cerrarModal}>Cerrar</Button>
          </Box>
        </ModalContenido>
      </Modal>
    </>
  );
};

export default CalendarioDisponibilidad;
