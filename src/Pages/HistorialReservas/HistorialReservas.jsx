import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerReservasPorUsuario } from "../../Services/reservasService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import { obtenerNombreCategoria } from "../../Utils/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  ContenedorHistorial,
  EncabezadoDetalle,
  BotonRetroceso,
  TituloHistorial,
  Bloque,
  ImagenServicio,
  TableBody,
  TableCell,
  Cell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonPuntuar,
  Acciones,
  ContenedorPaginacion,
  BotonPagina,
} from "./Historial.styled";
import { Margin } from "@mui/icons-material";

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        console.log("Usuario autenticado:", usuario);
        const data = await obtenerReservasPorUsuario(usuario.id);

        if (Array.isArray(data.content)) {
          const reservasConImagenes = await Promise.all(
            data.content.map(async (reserva) => {
              const imagenes = await obtenerImagenesPorServicio(
                reserva.servicio.id
              );
              return {
                ...reserva,
                imagen:
                  imagenes.length > 0
                    ? imagenes[0].urlImagen
                    : "https://via.placeholder.com/150",
              };
            })
          );
          const reservasOrdenadas = reservasConImagenes.sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
          );
          const totalReservas = reservasOrdenadas.length;
          const totalPaginas = Math.ceil(totalReservas / 10);
          const indiceInicial = paginaActual * 10;
          const reservasPaginas = reservasOrdenadas.slice(
            indiceInicial,
            indiceInicial + 10
          );
          setReservas(reservasPaginas);
          setTotalPaginas(totalPaginas);
        } else {
          setError("No se encontraron reservas para este usuario.");
          setReservas([]);
        }
      } catch (error) {
        console.error("Error al obtener el historial de reservas", error);
        setError("Hubo un error al obtener el historial de reservas.");
        setReservas([]);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, [paginaActual]);

  if (cargando) {
    return (
      <div
        style={{
          margin: "auto",
          fontSize: "28px",
          fontFamily: "'Poppins', sans-serif",
          color: "#2d0363",
        }}
      >
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          margin: "auto",
          fontSize: "28px",
          fontFamily: "'Poppins', sans-serif",
          color: "#2d0363",
        }}
      >
        {error}
      </div>
    );
  }

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({
      top: document.getElementById("encabezado").offsetTop - 20,
      behavior: "smooth",
    });
  };

  const formatearHora = (hora) => {
    // Crear una fecha válida combinando la hora con la fecha actual
    const ahora = new Date();
    const horaCompleta = `${ahora.getFullYear()}-${(ahora.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${ahora
      .getDate()
      .toString()
      .padStart(2, "0")}T${hora}`;

    const fecha = new Date(horaCompleta);

    // Verificar si la fecha es válida
    if (isNaN(fecha)) {
      return "Hora no válida";
    }

    return fecha.toTimeString().split(" ")[0];
  };

  return (
    <ContenedorHistorial>
      <EncabezadoDetalle>
        <BotonRetroceso onClick={() => navigate("/")}>
          <ArrowBackIcon
            style={{
              cursor: "pointer",
              color: "#f6ebf9",
            }}
          />
        </BotonRetroceso>
        <TituloHistorial>Historial de Reservas</TituloHistorial>
      </EncabezadoDetalle>
      <Bloque>
        <TableContainer>
          <TableHead>
            <TableRow id="encabezado">
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre del Servicio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Fecha de Reserva</TableCell>
              <TableCell>Empleado</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <Cell>
                  <ImagenServicio
                    src={reserva.imagen}
                    alt={reserva.servicio.nombre}
                  />
                </Cell>
                <Cell>{reserva.servicio.nombre}</Cell>
                <Cell>
                  {obtenerNombreCategoria(reserva.servicio.categoria)}
                </Cell>
                <Cell>{reserva.servicio.costo} USD</Cell>
                <Cell>
                  {reserva.fecha} / {formatearHora(reserva.hora)}
                </Cell>
                <Cell>{`${reserva.empleado.nombre} ${reserva.empleado.apellido}`}</Cell>
                <Cell>
                  {reserva.fechaCreacion} /{" "}
                  {formatearHora(reserva.horaCreacion)}
                </Cell>
                <Cell
                  style={{
                    color:
                      reserva.estado === "CONFIRMADA"
                        ? "gray"
                        : reserva.estado === "CONCLUIDA"
                        ? "green"
                        : "red",
                    textAlign: "center",
                  }}
                >
                  {reserva.estado}
                </Cell>
                <Cell>
                  <Acciones>
                    <ButtonPuntuar
                      variant="contained"
                      color="primary"
                      disabled={true}
                    >
                      Puntuar
                    </ButtonPuntuar>
                  </Acciones>
                </Cell>
              </TableRow>
            ))}
          </TableBody>

          <ContenedorPaginacion>
            <BotonPagina
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 0}
            >
              Página Anterior
            </BotonPagina>
            <span style={{ color: "white" }}>{paginaActual + 1}</span>
            <BotonPagina
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas - 1}
            >
              Página Siguiente
            </BotonPagina>
          </ContenedorPaginacion>
        </TableContainer>
      </Bloque>
    </ContenedorHistorial>
  );
};

export default HistorialReservas;
