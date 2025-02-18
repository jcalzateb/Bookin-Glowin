import React, { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { 
  ContenedorBuscador, 
  FondoBanner, 
  ContenedorContenido, 
  Isologo, 
  BarraBusqueda, 
  CampoBusqueda, 
  BotonBuscar,
  BotonLimpiar
} from "./Buscador.styled";

import Banner from "../../assets/banner.png";
import IsologoImg from "../../assets/isologo.png";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");

  const limpiarBusqueda = () => {
    setBusqueda("");
  };

  return (
    <ContenedorBuscador>

      <FondoBanner src={Banner} alt="Fondo banner" />

      <ContenedorContenido>
        <Isologo src={IsologoImg} alt="Glowin Isologo" />
        <BarraBusqueda>
          <CampoBusqueda
            variant="outlined"
            placeholder="Buscar"
            fullWidth
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <BotonLimpiar onClick={limpiarBusqueda}>
            <CleaningServicesIcon />
          </BotonLimpiar>
        </BarraBusqueda>

        <BotonBuscar>Buscar</BotonBuscar>
      </ContenedorContenido>
    </ContenedorBuscador>
  );
};

export default Buscador;
