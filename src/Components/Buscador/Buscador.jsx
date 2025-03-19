import React, { useState, useEffect, useRef } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs'; // Importar dayjs
//import esLocale from "date-fns/locale/es";
import { 
  ContenedorBuscador, 
  FondoBanner, 
  ContenedorContenido, 
  Isologo, 
  BarraBusqueda, 
  CampoBusqueda, 
  BotonBuscar,
  BotonLimpiar,
  ContenedorFecha, 
  ContenedorParametros,
  ResultadosContainer,
  TablaResultados,
  CabeceraTabla,
  FilaTabla,
  CeldaTabla
} from "./Buscador.styled";

import Banner from "/src/assets/banner_chica.jpg";
import IsologoImg from "/src/assets/isologo_light.svg";
import servicesData from "../../Utils/servicios.json";
import SuggestionsList from "./SuggestionList";

const Buscador = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);//
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Usar dayjs() en lugar de new Date()
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const suggestionsContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Constante para el mínimo de caracteres antes de mostrar sugerencias
  const MIN_CHARS_FOR_SUGGESTIONS = 3;

  useEffect(() => {
    // Solo procesamos sugerencias si no hay un servicio seleccionado
    // y si hay suficientes caracteres
    if (!hasSelected && query.trim().length >= MIN_CHARS_FOR_SUGGESTIONS) {
      const filteredSuggestions = servicesData.filter(service =>
        service.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      // Si no cumple las condiciones, ocultamos las sugerencias
      setSuggestions([]);
      setShowSuggestions(false);
    }
    // Si el usuario está escribiendo de nuevo, asumimos que quiere cambiar su selección
    if (hasSelected && query !== selectedService?.nombre) {
      setHasSelected(false);
    }
    setSelectedIndex(-1);

  }, [query, hasSelected, selectedService]);

  //Manejar clic fuera para cerrar sugerencias
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsContainerRef.current &&
        !suggestionsContainerRef.current.contains(event.target) &&
        event.target !== inputRef.current
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  //Manejar cambio en el input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Si borramos todo el texto, eliminamos también el servicio seleccionado
    if (e.target.value.trim() === '') {
      setSelectedService(null);
      setHasSelected(false);
    }
  };

  // Manejar selección de sugerencia
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.nombre);
    setSelectedService(suggestion);
    setShowSuggestions(false);
    setHasSelected(true);
    // Aquí podrías añadir la lógica para lo que ocurre al seleccionar un servicio
    console.log("Servicio seleccionado:", suggestion);
  };

  // Manejar navegación con teclado
  const handleKeyDown = (e) => {
    // Si no hay sugerencias visibles, no hacemos nada
    if (!showSuggestions || suggestions.length === 0) return;

    // Flecha abajo
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    }
    // Flecha arriba
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    }
    // Enter
    else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };
  // Manejar borrado de la selección
  const handleClearSelection = () => {
    setQuery('');
    setSelectedService(null);
    setHasSelected(false);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

   // Manejar la búsqueda
   const handleSearch = () => {
    if (!selectedService) {
      alert("Por favor selecciona un servicio");
      return;
    }

    if (!selectedDate) {
      alert("Por favor selecciona una fecha");
      return;
    }

    setIsSearching(true);
    
    // Simular una búsqueda con datos de ejemplo
    // En una aplicación real, aquí harías una petición a tu API
    setTimeout(() => {
      const resultadosEjemplo = [
        {
          id: selectedService.id,
          nombre: selectedService.nombre,
          fecha: selectedDate.format('DD/MM/YYYY'), // Usar format de dayjs en lugar de toLocaleDateString
          disponibilidad: "Disponible",
          turnos: Math.floor(Math.random() * 10) + 1
        }
      ];
      
      setSearchResults(resultadosEjemplo);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <>
    <ContenedorBuscador>
      <FondoBanner src={Banner} alt="Fondo banner" />
      <ContenedorContenido>
        <Isologo src={IsologoImg} alt="Glowin Isologo" />
        <ContenedorParametros>
        <BarraBusqueda
        >
          <CampoBusqueda
            ref={inputRef}
            variant="outlined"
            placeholder="Buscando..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            aria-expanded={showSuggestions}
            aria-owns="suggestions-list"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {showSuggestions && 
            <SuggestionsList
              suggestions={suggestions}
              selectedIndex={selectedIndex}
              onSuggestionClick={handleSuggestionClick}
              containerRef={suggestionsContainerRef}
              isTyping={query.trim().length >= MIN_CHARS_FOR_SUGGESTIONS}
            />
  }
          {query && <BotonLimpiar
            onClick={handleClearSelection}
            aria-label="Limpiar busqueda"
            >
            <CleaningServicesIcon />
          </BotonLimpiar>
          }
        </BarraBusqueda>
        {console.log("Servicio seleccionado:", selectedService)}
        <ContenedorFecha>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Selecciona una fecha"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)} // Restaurar el callback onChange
            renderInput={(params) => <TextField {...params} fullWidth/>}
            minDate={dayjs()} // Usar dayjs() para la fecha mínima
          />
          </LocalizationProvider>
        </ContenedorFecha>
        </ContenedorParametros>
        <BotonBuscar onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Buscando...' : 'Realizar Búsqueda'}
        </BotonBuscar>
      </ContenedorContenido>
    </ContenedorBuscador>
    {searchResults && (
      <ResultadosContainer>
        <h2>Resultados de la búsqueda</h2>
        <TablaResultados>
          <thead>
            <tr>
              <CabeceraTabla>Servicio</CabeceraTabla>
              <CabeceraTabla>Fecha</CabeceraTabla>
              <CabeceraTabla>Disponibilidad</CabeceraTabla>
              <CabeceraTabla>Turnos disponibles</CabeceraTabla>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((resultado) => (
              <FilaTabla key={resultado.id}>
                <CeldaTabla>{resultado.nombre}</CeldaTabla>
                <CeldaTabla>{resultado.fecha}</CeldaTabla>
                <CeldaTabla>{resultado.disponibilidad}</CeldaTabla>
                <CeldaTabla>{resultado.turnos}</CeldaTabla>
              </FilaTabla>
            ))}
          </tbody>
        </TablaResultados>
      </ResultadosContainer>
    )}
  </>
  );
};

export default Buscador;
