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
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar locale español para dayjs

import {
  obtenerDisponibilidadMensual,
  obtenerTurnosDisponibles,
} from "../../Services/disponibilidadService";

// Configurar dayjs para usar español como idioma por defecto
dayjs.locale("es");

const CalendarioIcono = styled(IconButton)({
  fontSize: "30px",
  color: "#2d0363",
  borderRadius: "50% !important",
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
  padding: "15px !important",
  alignItems: "center !important",
  textAlign: "center !important",
  "@media (max-width: 786px)": {
    width: "95% !important",
    padding: "5px 5px !important",
  },
});

const ContenedorFecha = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  margin: "1rem auto",
  borderRadius: "20px",
  marginBottom: "0px",
  padding: "10px",

  // Cambio del fondo del calendario a blanco
  "& .MuiDateCalendar-root": {
    backgroundColor: "#ffffff",
    transition: "opacity 0.2s ease-in-out",
    maxHeight: "275px",
  },

  // Estilo del encabezado del mes/año
  "& .MuiPickersCalendarHeader-root": {
    backgroundColor: "#2d0363", // Morado oscuro
    padding: "10px 0",
    marginTop: 0,
    borderRadius: "10px 10px 0 0",
    flexDirection: "row", // Asegurar dirección de flexbox correcta
  },

  // Estilo para el nombre del mes y año
  "& .MuiPickersCalendarHeader-labelContainer": {
    fontWeight: "normal",
    fontSize: "14px",
    width: "100%",
    textTransform: "capitalize",
    color: "#f6ebf9", // Rosa claro
    order: 1, // Colocar el nombre en el medio
  },

  // Estilo para la flecha izquierda (mes anterior)
  "& .MuiPickersArrowSwitcher-button:first-of-type": {
    color: "#f6ebf9", // Rosa claro para las flechas
    order: 0, // Colocar flecha izquierda a la izquierda
    "&.Mui-disabled": {
      color: "rgba(246, 235, 249, 0.3)", // Rosa claro semi-transparente cuando está deshabilitado
    },
    pointerEvents: "auto", // Asegurarse de que los eventos del mouse funcionen
  },

  // Estilo para la flecha derecha (mes siguiente)
  "& .MuiPickersArrowSwitcher-button:last-of-type": {
    color: "#f6ebf9", // Rosa claro para las flechas
    order: 2, // Colocar flecha derecha a la derecha
    pointerEvents: "auto", // Asegurarse de que los eventos del mouse funcionen
  },

  // Estilo para la fila de días de la semana
  "& .MuiDayCalendar-weekDayLabel": {
    backgroundColor: "#f6ebf9", // Rosa pastel claro
    color: "#2d0363", // Morado oscuro
    fontWeight: "normal",
    width: "100%",
    margin: "0px",
    marginTop: "-3.5px",
  },

  // Ajustar el espaciado entre elementos del encabezado
  "& .MuiPickersArrowSwitcher-spacer": {
    width: "0px", // Ajustar espaciador
  },

  // Estilo para el contenedor de días de la semana
  "& .MuiDayCalendar-weekDayContainer": {
    backgroundColor: "#f6ebf9", // Rosa pastel claro
    margin: "0px",
    padding: "0px",
    width: "100%",
  },

  "@media (max-width: 768px)": {
    maxWidth: "100%",
  },
  // Estilo para el contenedor de la semana
  "& .MuiDayCalendar-weekContainer": {
    margin: "0px",
    paddingTop: "1px",
    paddingRight: "0px",
    paddingLeft: "0px",
    display: "flex",
    justifyContent: "space-between",
  },
});

// Estilo para el encabezado de los turnos disponibles
const EncabezadoTurnos = styled(Typography)(({ theme }) => ({
  backgroundColor: "#2d0363", // Morado oscuro
  color: "#f6ebf9", // Rosa claro
  padding: "10px",
  borderRadius: "8px 8px 0 0",
  width: "100%",
  fontFamily: "Poppins, sans-serif",
  textAlign: "left",
  marginBottom: "10px",
  fontWeight: "normal",
}));

// Estilo para botones de turnos disponibles e indisponibles
const TurnoBoton = styled(Button)(({ disabled }) => ({
  textTransform: "none",
  backgroundColor: disabled ? "#f5f5f5" : "transparent",
  color: disabled ? "#bdbdbd" : "#2d0363",
  border: `1px solid ${disabled ? "#e0e0e0" : "#9c27b0"}`,
  "&:hover": {
    backgroundColor: disabled ? "#f5f5f5" : "#9c27b0",
    color: disabled ? "#bdbdbd" : "white",
  },
  "@media (max-width: 786px)": {
    fontSize: "12px",
  },
}));

const CalendarioDisponibilidad = ({ servicioId, onSeleccionTurno, toggleAbierto }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs());
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [todosLosTurnos, setTodosLosTurnos] = useState([]); // Nuevo estado para todos los turnos posibles
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [disponibilidadMensual, setDisponibilidadMensual] = useState({});
  const [mesActual, setMesActual] = useState({
    anio: dayjs().year(),
    mes: dayjs().month() + 1,
  });
  const [cambiandoMes, setCambiandoMes] = useState(false);

  // Definir horarios posibles de 9:00 a 18:00
  const TODOS_HORARIOS = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  useEffect(() => {
    if (modalAbierto) {
      cargarDisponibilidadMensual(mesActual.anio, mesActual.mes);
    }
  }, [modalAbierto, mesActual, servicioId]);

  useEffect(() => {
    if (fechaSeleccionada && modalAbierto) {
      cargarTurnosDisponibles(fechaSeleccionada);

      const mesSeleccionado = fechaSeleccionada.month() + 1;
      const anioSeleccionado = fechaSeleccionada.year();

      if (
        mesSeleccionado !== mesActual.mes ||
        anioSeleccionado !== mesActual.anio
      ) {
        setMesActual({
          anio: anioSeleccionado,
          mes: mesSeleccionado,
        });
      }
    }
  }, [fechaSeleccionada, modalAbierto]);

  // Cada vez que cambian los turnos disponibles, actualizar todos los turnos
  useEffect(() => {
    if (fechaSeleccionada) {
      const fechaFormateada = fechaSeleccionada.format("YYYY-MM-DD");
      const turnosCompletos = TODOS_HORARIOS.map((hora) => {
        // Verificar si este horario está disponible
        const disponible = turnosDisponibles.some(
          (turno) => turno.hora === hora
        );
        return {
          id: disponible
            ? turnosDisponibles.find((t) => t.hora === hora).id
            : `indisponible-${fechaFormateada}-${hora}`,
          hora,
          fecha: fechaFormateada,
          disponible,
        };
      });
      setTodosLosTurnos(turnosCompletos);
    }
  }, [turnosDisponibles, fechaSeleccionada]);

  useEffect(() => {
    if (toggleAbierto) {
      const unsubscribe = toggleAbierto.subscribe(() => {
        abrirModal();
      });

      return () => {
        unsubscribe();
      };
    }
  }, [toggleAbierto]);

  const cargarDisponibilidadMensual = async (anio, mes) => {
    setCargando(true);
    try {
      const disponibilidadPorDia = await obtenerDisponibilidadMensual(
        servicioId,
        anio,
        mes
      );
      setDisponibilidadMensual((prevDisponibilidad) => ({
        ...prevDisponibilidad,
        ...disponibilidadPorDia,
      }));
    } catch (err) {
      setError("No se pudo cargar la disponibilidad");
      console.error(err);
    } finally {
      setCargando(false);
      setCambiandoMes(false);
    }
  };

  const cargarTurnosDisponibles = async (fecha) => {
    if (!fecha) return;

    setCargando(true);
    try {
      const fechaFormateada = fecha.format("YYYY-MM-DD");
      const turnos = await obtenerTurnosDisponibles(
        servicioId,
        fechaFormateada
      );
      setTurnosDisponibles(turnos);
    } catch (err) {
      console.error("Error al obtener turnos:", err);
      setTurnosDisponibles([]);
    } finally {
      setCargando(false);
    }
  };

  const abrirModal = () => {
    setModalAbierto(true);
    setFechaSeleccionada(dayjs());
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTurnosDisponibles([]);
  };

  const seleccionarTurno = (turno) => {
    if (turno.disponible && onSeleccionTurno && fechaSeleccionada) {
      onSeleccionTurno(fechaSeleccionada, turno);
      cerrarModal();
    }
  };

  const handleMesChange = (fecha) => {
    if (!fecha) return;

    setCambiandoMes(true);

    const nuevoAnio = fecha.year();
    const nuevoMes = fecha.month() + 1;

    if (nuevoMes !== mesActual.mes || nuevoAnio !== mesActual.anio) {
      setMesActual({
        anio: nuevoAnio,
        mes: nuevoMes,
      });
    }
  };

  // Función para marcar fechas con disponibilidad
  const esFechaDisponible = (date) => {
    const fechaStr = date.format("YYYY-MM-DD");
    return (
      !disponibilidadMensual[fechaStr] ||
      disponibilidadMensual[fechaStr].length === 0
    );
  };

  const renderizarTurnos = () => {
    if (!fechaSeleccionada) {
      return (
        <Box mt={2}>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Selecciona una fecha para ver los turnos disponibles
          </Typography>
        </Box>
      );
    }

    if (cargando) {
      return (
        <Box mt={2} display="flex" justifyContent="center">
          <CircularProgress size={30} />
        </Box>
      );
    }

    // Formato simplificado para la fecha
    const fechaFormato = fechaSeleccionada.format("DD/MM/YYYY");

    return (
      <Box mt={0} width="100%">
        <EncabezadoTurnos variant="h6">
          Horario Disponible: {fechaFormato}
        </EncabezadoTurnos>

        {todosLosTurnos.length === 0 ? (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No hay información de horarios para esta fecha.
          </Typography>
        ) : (
          <Grid container spacing={1.5} mt={0} px={2}>
            {todosLosTurnos.map((turno) => (
              <Grid item xs={6} sm={4} key={turno.id}>
                <TurnoBoton
                  variant="outlined"
                  fullWidth
                  onClick={() => seleccionarTurno(turno)}
                  disabled={!turno.disponible}
                >
                  {turno.hora}
                </TurnoBoton>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  return (
    <>
      <CalendarioIcono onClick={abrirModal} aria-label="Ver disponibilidad">
        <CalendarMonthIcon sx={{ fontSize: "inherit" }} />
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
            <Typography
              sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.45rem" }}
            variant="h5">Disponibilidad</Typography>
          </Box>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
            <ContenedorFecha>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DateCalendar
                  value={fechaSeleccionada}
                  onChange={(newValue) => setFechaSeleccionada(newValue)}
                  loading={cargando || cambiandoMes}
                  minDate={dayjs()}
                  onMonthChange={handleMesChange}
                  shouldDisableDate={esFechaDisponible}
                  disablePast={true} // Asegurar que no se pueda navegar al pasado
                  views={["day"]} // Solo mostrar la vista de días
                  sx={{
                    opacity: cambiandoMes ? 0.7 : 1,
                    transition: "opacity 0.3s ease-in-out",
                    backgroundColor: "#fff",
                    marginTop: "-25px",
                    "& .MuiPickersDay-root": {
                      borderRadius: "50%",
                    },
                    "& .MuiPickersDay-today": {
                      border: "1px solid #c595ce",
                      color: "#9c27b0",
                    },
                    "& .MuiPickersDay-daySelected": {
                      backgroundColor: "#9c27b0",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#7b1fa2",
                      },
                    },
                    "& .Mui-disabled": {
                      color: "#bdbdbd",
                    },
                    "& .MuiPickersCalendarHeader-switchViewButton": {
                      display: "none",
                    },
                    "& .MuiPickersCalendarHeader-root": {
                      backgroundColor: "#2d0363",
                      padding: "10px 0",
                      marginTop: 0,
                      borderRadius: "10px 10px 0 0",
                      color: "#f6ebf9",
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      color: "#f6ebf9",
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      backgroundColor: "#f6ebf9",
                      color: "#2d0363",
                      fontWeight: "normal",
                    },
                    "& .MuiDayCalendar-weekDayContainer": {
                      backgroundColor: "#f6ebf9",
                    },
                    "& .MuiPickersArrowSwitcher-root": {
                      display: "flex",
                      justifyContent: "space-between"
                    }
                  }}
                />
              </LocalizationProvider>
            </ContenedorFecha>

            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "0",
                flex: 1,
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                overflow: "hidden",
              }}
            >
              {renderizarTurnos()}
            </Box>
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={cerrarModal} color="primary">
              Cerrar
            </Button>
          </Box>
        </ModalContenido>
      </Modal>
    </>
  );
};

export default CalendarioDisponibilidad;
