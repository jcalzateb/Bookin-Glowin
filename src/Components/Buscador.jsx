import React, { useState } from "react";
import { Box, Typography, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

const estilosSelect = {
    minWidth: 200,
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
      "& fieldset": {
        borderColor: "#C4C4C4",
      },
      "&:hover fieldset": {
        borderColor: "#1C1919",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1C1919",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#000",
    },
    "& .Mui-focused": {
      color: "#000 !important",
    },
  };

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Título */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "36px", md: "48px" },
          fontWeight: "bold",
          fontStyle: "italic",
          fontFamily: "Lora, serif",
        }}
      >
        Brilla con estilo
      </Typography>

      {/* Barra de Búsqueda y Botón Limpiar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", maxWidth: "500px", width: "100%" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              "& fieldset": {
                borderColor: "#C4C4C4",
              },
              "&:hover fieldset": {
                borderColor: "#1C1919",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1C1919",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Botón Limpiar */}
        <IconButton
          onClick={limpiarCampos}
          sx={{
            backgroundColor: "#CCCCCC",
            color: "1C1919",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            "&:hover": {
              backgroundColor: "#BCBCBC",
            },
          }}
        >
          <CleaningServicesIcon />
        </IconButton>
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Servicio */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>
            Servicio:
          </Typography>
          <FormControl sx={estilosSelect}>
            <InputLabel id="servicio-label">Elije una opción</InputLabel>
            <Select
              labelId="servicio-label"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            >
              <MenuItem value="peinado">Peinados</MenuItem>
              <MenuItem value="uhna">Uñas</MenuItem>
              <MenuItem value="pestañas">Pestañas</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Profesional */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>
            Profesional:
          </Typography>
          <FormControl sx={estilosSelect}>
            <InputLabel id="profesional-label">Elije una opción</InputLabel>
            <Select
              labelId="profesional-label"
              value={profesional}
              onChange={(e) => setProfesional(e.target.value)}
            >
              <MenuItem value="andres">Andres</MenuItem>
              <MenuItem value="valentina">Valentina</MenuItem>
              <MenuItem value="eric">Eric</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Horario */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>
            Horario:
          </Typography>
          <FormControl sx={estilosSelect}>
            <InputLabel id="horario-label">Elije una opción</InputLabel>
            <Select
              labelId="horario-label"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              <MenuItem value="mañana">Mañana</MenuItem>
              <MenuItem value="tarde">Tarde</MenuItem>
              <MenuItem value="noche">Noche</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Buscador;
