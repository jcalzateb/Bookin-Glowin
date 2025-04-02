import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, RadioGroup, Snackbar, Alert } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { realizarReserva } from "../../Services/reservasService";
import { obtenerServicioPorId } from "../../Services/serviciosService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import { obtenerEmpleadosDisponibles } from "../../Services/empleadosService";
import { obtenerUsuarioPorId } from "../../Services/usuariosService";

import {
  ContenedorPrincipal,
  TituloReserva,
  ContenedorReserva,
  SeccionIzquierda,
  SeccionDerecha,
  Seccion,
  TituloSeccion,
  DatosUsuarioForm,
  CampoFormulario,
  LabelCampo,
  ValorCampo,
  TarjetaServicio,
  ImagenServicio,
  ContenidoServicio,
  TituloServicio,
  DetalleServicio,
  ContenedorEmpleados,
  ListaEmpleados,
  TarjetaEmpleado,
  ImagenEmpleado,
  NombreEmpleado,
  ProfesionEmpleado,
  BotonAleatorio,
  ContenedorMonto,
  TextoMonto,
  ValorMonto,
  ContenedorMetodosPago,
  OpcionPago,
  RadioPago,
  ContenedorBotones,
  BotonConfirmar,
  BotonCancelar,
  LogoPago,
  IconoMetodoPago
} from "./Reserva.styled";

// Importamos los logos de las tarjetas
import visaLogo from "../../assets/logo_visa.svg";
import mastercardLogo from "../../assets/logo_mastercard.svg";
import mercadopagoLogo from "../../assets/logo_mercadopago.svg";
import cashLogo from "../../assets/logo_cash.svg";

const Reserva = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Datos de la reserva
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servicio, setServicio] = useState(null);
  const [imagenServicio, setImagenServicio] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("warning");

  // Obtener datos del state de navegación
  const servicioId = location.state?.servicioId;
  const turnoId = location.state?.turnoId;
  const hora = location.state?.hora;
  const fecha = location.state?.fecha;
  
  // Definimos el turno directamente con los valores de location.state
  const turno = {
    id: turnoId,
    hora: hora,
    fecha: fecha
  };
  console.log("Fecha:", fecha);

  useEffect(() => {
    if (!servicioId || !turnoId || !hora || !fecha) {
      setError("No se proporcionaron todos los datos necesarios para la reserva.");
      setIsLoading(false);
      return;
    }

    const cargarDatos = async () => {
      try {
        // Obtener información del servicio
        if (servicioId && turnoId && hora && fecha) {
          console.log("Turno:", { id: turnoId, hora: hora, fecha: fecha });
          const servicioData = await obtenerServicioPorId(servicioId);
          setServicio(servicioData);
          console.log("Servicio:", servicioData);
          if (!servicioData) {
            setError("No se encontró el servicio solicitado.");
            return;
          }
        }

        // Obtener imágenes del servicio
        const imagenesData = await obtenerImagenesPorServicio(servicioId);
        if (imagenesData && imagenesData.length > 0) {
          setImagenServicio(imagenesData[0].urlImagen);
        }

        // Obtener datos del usuario actual
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
        console.log("Usuario:", usuario);

        // Obtener empleados disponibles
        const horaServicio = hora.split(" ")[0]; // Obtener solo la hora sin AM/PM
        const empleadosData = await obtenerEmpleadosDisponibles(servicioId, horaServicio);
        setEmpleados(empleadosData);

      } catch (err) {
        console.error("Error al cargar datos para la reserva:", err);
        setError("Error al cargar la información necesaria para la reserva.");
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, [servicioId, turnoId, hora, fecha]);

  // Seleccionar un empleado aleatorio
  const seleccionarEmpleadoAleatorio = () => {
    if (empleados.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * empleados.length);
      setEmpleadoSeleccionado(empleados[indiceAleatorio]);
      // Confirmar visualmente la selección con un Snackbar
      setSnackbarMessage("Profesional seleccionado aleatoriamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
  };

  // Confirmar la reserva - modificado para usar Snackbar
  const confirmarReserva = async () => {
    if (!empleadoSeleccionado) {
      setSnackbarMessage("Por favor seleccione un profesional para la atención");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }
    console.log("usuarioId desde localStorage:", usuario);
    if (!usuario) {
      setError("No se pudo obtener la información del usuario");
      return;
    }
    const horaConSegundos = `${hora.split(" ")[0]}:00`;
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
      await realizarReserva(reservaData);
      navigate("/reserva-confirmada");
    } catch (err) {
      console.error("Error al confirmar la reserva:", err);
      setSnackbarMessage("Ocurrió un error al procesar la reserva. Intente nuevamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cierre del Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Modificamos la implementación para incluir un div contenedor que pueda capturar el clic
  // aún cuando el botón esté desactivado
  const handleBotonReservaClick = (e) => {
    if (!empleadoSeleccionado) {
      setSnackbarMessage("Debe seleccionar un profesional para la atención");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (isLoading) {
    return (
      <ContenedorPrincipal>
        <CircularProgress size={60} style={{ color: "#2d0363", marginTop: 100 }} />
      </ContenedorPrincipal>
    );
  }

  if (error) {
    return (
      <ContenedorPrincipal>
        <TituloReserva variant="h4">Error</TituloReserva>
        <p>{error}</p>
        <BotonCancelar onClick={() => navigate(-1)}>Volver</BotonCancelar>
      </ContenedorPrincipal>
    );
  }

  return (
    <ContenedorPrincipal>
      {/* Snackbar para notificaciones */}
      <Snackbar 
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ marginTop: '70px' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <TituloReserva variant="h2">Confirma tu Reserva</TituloReserva>
      
      <ContenedorReserva>
        <SeccionIzquierda>
          {/* SECCIÓN 1: DATOS DE RESERVA */}
          <Seccion>
            <TituloSeccion variant="h5">1. Datos de Reserva</TituloSeccion>
            
            {/* Datos del usuario */}
            <DatosUsuarioForm>
              <CampoFormulario>
                <LabelCampo
                  sx={{fontSize: "17px", fontWeight: "bold", color: "#2d0363"}}
                  variant="subtitle2">
                Nombre
                </LabelCampo>
                <ValorCampo variant="body1">{usuario?.nombre} {usuario?.apellido}</ValorCampo>
              </CampoFormulario>
              
              <CampoFormulario>
                <LabelCampo 
                sx={{fontSize: "17px", fontWeight: "bold", color: "#2d0363"}}
                variant="subtitle2">Teléfono</LabelCampo>
                <ValorCampo variant="body1">{usuario?.celular || "No disponible"}</ValorCampo>
              </CampoFormulario>
              
              <CampoFormulario>
                <LabelCampo 
                sx={{fontSize: "16px", fontWeight: "bold", color: "#2d0363"}}
                variant="subtitle2">Email</LabelCampo>
                <ValorCampo variant="body1">{usuario?.email || "No disponible"}</ValorCampo>
              </CampoFormulario>
              
              <CampoFormulario>
                <LabelCampo
                sx={{fontSize: "16px", fontWeight: "bold", color: "#2d0363"}}
                variant="subtitle2">Fecha y Hora</LabelCampo>
                <ValorCampo variant="body1">
                  {new Date(fecha).toLocaleDateString("es-ES", { timeZone: "UTC",})} - {hora} horas
                </ValorCampo>
              </CampoFormulario>
            </DatosUsuarioForm>
            
            {/* Tarjeta del servicio */}
            <TarjetaServicio>
              <ImagenServicio 
                src={imagenServicio || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                alt={servicio?.nombre} 
              />
              <ContenidoServicio>
                <TituloServicio variant="h6">{servicio?.nombre}</TituloServicio>
                <DetalleServicio variant="body2">Categoría: {servicio?.categoria}</DetalleServicio>
                <DetalleServicio variant="body2">Duración: {servicio?.duracionMinutos} minutos</DetalleServicio>
                <DetalleServicio variant="body2">Descripción: {servicio?.descripcion?.substring(0, 100)}...</DetalleServicio>
              </ContenidoServicio>
            </TarjetaServicio>
            
            {/* Subsección: Selección de empleados */}
            <ContenedorEmpleados>
              <TituloSeccion variant="h6">2. Selecciona tu Profesional</TituloSeccion>
              
              <BotonAleatorio 
                startIcon={<ShuffleIcon />}
                onClick={seleccionarEmpleadoAleatorio}
              >
                Seleccionar aleatoriamente
              </BotonAleatorio>
              
              <ListaEmpleados>
                {empleados.length > 0 ? (
                  empleados.map((empleado) => (
                    <TarjetaEmpleado 
                      key={empleado.id}
                      onClick={() => setEmpleadoSeleccionado(empleado)}
                      $seleccionado={empleadoSeleccionado?.id === empleado.id}
                    >
                      <ImagenEmpleado 
                        src={empleado.urlFoto || "https://via.placeholder.com/150"}
                        alt={`${empleado.nombre} ${empleado.apellido}`}
                      />
                      <NombreEmpleado variant="body1">
                        {empleado.nombre} {empleado.apellido}
                      </NombreEmpleado>
                      <ProfesionEmpleado variant="body2">
                        {empleado.profesion}
                      </ProfesionEmpleado>
                    </TarjetaEmpleado>
                  ))
                ) : (
                  <p>No hay profesionales disponibles en este horario.</p>
                )}
              </ListaEmpleados>
            </ContenedorEmpleados>
          </Seccion>
        </SeccionIzquierda>
        
        <SeccionDerecha>
          {/* SECCIÓN 2: MONTO */}
          <Seccion>
            <TituloSeccion variant="h5">3. Resumen de Pago</TituloSeccion>
            
            <ContenedorMonto>
              <TextoMonto variant="body1">Total a pagar:</TextoMonto>
              <ValorMonto variant="h4">${servicio?.costo?.toFixed(2)}</ValorMonto>
            </ContenedorMonto>
          </Seccion>
          
          {/* SECCIÓN 3: MÉTODOS DE PAGO */}
          <Seccion>
            <TituloSeccion variant="h5">4. Método de Pago</TituloSeccion>
            
            <RadioGroup
              aria-label="metodo-pago"
              name="metodo-pago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              style={{ width: '100%' }}
            >
              <ContenedorMetodosPago>
                <OpcionPago 
                  value="visa" 
                  control={<RadioPago />} 
                  label={
                    <IconoMetodoPago>
                      <LogoPago src={visaLogo} alt="Visa" />
                    </IconoMetodoPago>
                  } 
                />
                <OpcionPago 
                  value="mastercard" 
                  control={<RadioPago />} 
                  label={
                    <IconoMetodoPago>
                      <LogoPago src={mastercardLogo} alt="MasterCard" />
                    </IconoMetodoPago>
                  } 
                />
                <OpcionPago 
                  value="mercadopago" 
                  control={<RadioPago />} 
                  label={
                    <IconoMetodoPago>
                      <LogoPago src={mercadopagoLogo} alt="Mercado Pago" />
                    </IconoMetodoPago>
                  } 
                />
                <OpcionPago 
                  value="efectivo" 
                  control={<RadioPago />} 
                  label={
                    <IconoMetodoPago>
                      <LogoPago src={cashLogo} alt="Efectivo" />
                      <span>Efectivo</span>
                    </IconoMetodoPago>
                  } 
                />
              </ContenedorMetodosPago>
            </RadioGroup>
            
            
          </Seccion>
          <ContenedorBotones>
              <BotonCancelar onClick={() => navigate(-1)}>
                Cancelar
              </BotonCancelar>
              <div onClick={handleBotonReservaClick} style={{width: '100%'}}>
                <BotonConfirmar sx={{cursor:"pointer"}}
                  variant="contained"
                  color="primary"
                  onClick={confirmarReserva}
                  disabled={isLoading || !empleadoSeleccionado}>
                  
                  Confirmar Reserva
                </BotonConfirmar>
              </div>
            </ContenedorBotones>
        </SeccionDerecha>
      </ContenedorReserva>
    </ContenedorPrincipal>
  );
};

export default Reserva;
