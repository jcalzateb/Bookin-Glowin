import React, { useState } from "react";
import { Rating, TextField, Button, Box, Typography } from "@mui/material";
import { realizarValoracion } from "../../Services/valoracionesService"; // Servicio para guardar la valoración

const PuntuacionEstrellas = ({ productoId, usuarioId, onNuevaValoracion }) => {
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const manejarValoracion = async () => {
    if (puntuacion < 1 || puntuacion > 5) {
      setError(
        "Por favor, selecciona una puntuación válida de 1 a 5 estrellas."
      );
      return;
    }

    setIsLoading(true);
    try {
      await realizarValoracion(productoId, usuarioId, puntuacion, comentario);
      onNuevaValoracion();
      setPuntuacion(0);
      setComentario("");
    } catch (err) {
      setError("Hubo un error al guardar tu valoración.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Tu Valoración</Typography>
      <Rating
        name="puntuacion"
        value={puntuacion}
        onChange={(event, newValue) => setPuntuacion(newValue)}
        size="large"
      />
      <TextField
        label="Comentario"
        multiline
        rows={4}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={manejarValoracion}
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar Valoración"}
      </Button>
    </Box>
  );
};

export default PuntuacionEstrellas;
