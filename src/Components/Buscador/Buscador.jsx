import React, { useState } from "react";
import { Box, Typography, InputAdornment, MenuItem, InputLabel, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  ContenedorBuscador,
  CampoBusqueda,
  ContenedorFiltros,
  Filtro,
  BotonLimpiar,
} from "./Buscador.styled";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [servicio, setServicio] = useState("");
  const [profesional, setProfesional] = useState("");
  const [horario, setHorario] = useState("");

  const limpiarCampos = () => {
    setBusqueda("");
    setServicio("");
    setProfesional("");
    setHorario("");
  };

  return (
    <ContenedorBuscador>
      {/* Título */}
      <Typography variant="h1" sx={{ fontSize: { xs: "36px", md: "48px" }, fontWeight: "bold", fontStyle: "italic", fontFamily: "Lora, serif" }}>
        Brilla con estilo
      </Typography>

      {/* Barra de Búsqueda y Botón Limpiar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", maxWidth: "500px", width: "100%" }}>
        <CampoBusqueda
          variant="outlined"
          placeholder="Buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <BotonLimpiar onClick={limpiarCampos}>
          <CleaningServicesIcon />
        </BotonLimpiar>
      </Box>

      {/* Filtros */}
      <ContenedorFiltros>
        {/* Servicio */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>Servicio:</Typography>
          <Filtro>
            <InputLabel id="servicio-label">Elije una opción</InputLabel>
            <Select labelId="servicio-label" value={servicio} onChange={(e) => setServicio(e.target.value)}>
              <MenuItem value="peinado">Peinados</MenuItem>
              <MenuItem value="uhna">Uñas</MenuItem>
              <MenuItem value="pestañas">Pestañas</MenuItem>
            </Select>
          </Filtro>
        </Box>

        {/* Profesional */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>Profesional:</Typography>
          <Filtro>
            <InputLabel id="profesional-label">Elije una opción</InputLabel>
            <Select labelId="profesional-label" value={profesional} onChange={(e) => setProfesional(e.target.value)}>
              <MenuItem value="andres">Andres</MenuItem>
              <MenuItem value="valentina">Valentina</MenuItem>
              <MenuItem value="eric">Eric</MenuItem>
            </Select>
          </Filtro>
        </Box>

        {/* Horario */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>Horario:</Typography>
          <Filtro>
            <InputLabel id="horario-label">Elije una opción</InputLabel>
            <Select labelId="horario-label" value={horario} onChange={(e) => setHorario(e.target.value)}>
              <MenuItem value="mañana">Mañana</MenuItem>
              <MenuItem value="tarde">Tarde</MenuItem>
              <MenuItem value="noche">Noche</MenuItem>
            </Select>
          </Filtro>
        </Box>
      </ContenedorFiltros>
    </ContenedorBuscador>
  );
};

export default Buscador;
