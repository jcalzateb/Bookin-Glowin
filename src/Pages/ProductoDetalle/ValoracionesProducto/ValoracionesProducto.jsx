import React, { useState, useEffect } from "react";
import { Rating, Box, Typography, CircularProgress } from "@mui/material";
import {
  obtenerValoracionesProducto,
  obtenerPuntuacionMedia,
} from "../../Services/valoracionesService";

const ValoracionesProducto = ({ productoId }) => {
  const [valoraciones, setValoraciones] = useState([]);
  const [puntuacionMedia, setPuntuacionMedia] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarValoraciones = async () => {
      try {
        const valoracionesData = await obtenerValoracionesProducto(productoId);
        const puntuacionData = await obtenerPuntuacionMedia(productoId);

        setValoraciones(valoracionesData);
        setPuntuacionMedia(puntuacionData);
      } catch (err) {
        console.error("Error al cargar las valoraciones", err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarValoraciones();
  }, [productoId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h6">Valoraciones del Producto</Typography>
      <Rating value={puntuacionMedia} readOnly size="large" />
      <Typography variant="body1">
        Puntuación Media: {puntuacionMedia}
      </Typography>

      <Box mt={2}>
        {valoraciones.map((valoracion) => (
          <Box key={valoracion.id} mb={2}>
            <Rating value={valoracion.puntuacion} readOnly size="small" />
            <Typography variant="body2">{valoracion.comentario}</Typography>
            <Typography variant="body2" color="textSecondary">
              - {valoracion.usuarioNombre}, {valoracion.fecha}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ValoracionesProducto;
