import React, { useState, useEffect, useRef } from "react";
import { InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar locale español para dayjs
import { useNavigate } from 'react-router-dom';
import { buscarServicios } from "../../Services/buscadorService";
import { buscarDisponibilidad } from "../../Services/disponibilidadService";
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
import SuggestionsList from "./SuggestionList";

// Configurar dayjs para usar español como idioma por defecto
dayjs.locale('es');

const Buscador = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const suggestionsContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Constante para el mínimo de caracteres antes de mostrar sugerencias
  const MIN_CHARS_FOR_SUGGESTIONS = 3;

  useEffect(() => {
    // Función para obtener sugerencias desde la API
    const fetchSuggestions = async () => {
      if (!hasSelected && query.trim().length >= MIN_CHARS_FOR_SUGGESTIONS) {
        setIsLoading(true);
        setError(null);
        try {
          // Usamos la función de buscadorService para obtener los datos
          const data = await buscarServicios(query);
          setSuggestions(data || []);
          console.log("Sugerencias:", data);
          setShowSuggestions(true);
        } catch (err) {
          setError("Error al obtener sugerencias");
          console.error("Error al buscar servicios:", err);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }

      // Si el usuario está escribiendo de nuevo, asumimos que quiere cambiar su selección
      if (hasSelected && query !== selectedService?.nombre) {
        setHasSelected(false);
      }
      setSelectedIndex(-1);
    };

    // Usar un temporizador para no hacer demasiadas peticiones mientras el usuario escribe
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
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
   const handleSearch = async () => {
    if (!selectedService) {
      alert("Por favor selecciona un servicio");
      return;
    }

    if (!selectedDate) {
      alert("Por favor selecciona una fecha");
      return;
    }

    setIsSearching(true);
    
    try {
      // Formatear la fecha a YYYY-MM-DD para enviar al backend
      const fechaFormateada = selectedDate.format('YYYY-MM-DD');
      
      // Usar el nuevo servicio para buscar la disponibilidad
      const respuestaDisponibilidad = await buscarDisponibilidad(
        selectedService.id, 
        fechaFormateada,
        fechaFormateada
      );
      
      console.log("Fecha formateada:", fechaFormateada);
      console.log("Respuesta de disponibilidad:", respuestaDisponibilidad);
      
      // Preparar el resultado para mostrar en la tabla
      const resultado = {
        id: selectedService.id,
        nombre: selectedService.nombre,
        fecha: selectedDate.format('DD [de] MMMM [de] YYYY'),
        disponibilidad: respuestaDisponibilidad && respuestaDisponibilidad.length > 0 ? "Disponible" : "No disponible",
        turnos: respuestaDisponibilidad ? respuestaDisponibilidad.length : 0,
      };
      
      setSearchResults([resultado]);
      
    } catch (err) {
      console.error("Error al buscar disponibilidad:", err);
      alert("Error al buscar disponibilidad. Intente nuevamente.");
    } finally {
      setIsSearching(false);
    }
  };

  // Nueva función para redireccionar al detalle del servicio
  const handleRedirectToService = (serviceId) => {
    navigate(`/producto/${serviceId}`);
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
                  {isLoading ? <span>Cargando...</span> : <SearchIcon />}
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              label="Selecciona una fecha"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={dayjs()}
              format="DD/MM/YYYY"
              slotProps={{ 
                textField: { fullWidth: true },
                day: {
                  disableHighlightToday: false,
                }
              }}
            />
          </LocalizationProvider>
        </ContenedorFecha>
        {console.log("Fecha seleccionada:", selectedDate)}
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
              <CabeceraTabla>Acción</CabeceraTabla>
            </tr>
          </thead>
          <tbody>
            {searchResults.length > 0 ? (
              searchResults.map((resultado) => (
                <FilaTabla key={resultado.id}>
                  <CeldaTabla>{resultado.nombre}</CeldaTabla>
                  <CeldaTabla>{resultado.fecha}</CeldaTabla>
                  <CeldaTabla 
                    style={{ 
                      color: resultado.disponibilidad === "Disponible" ? "#4caf50" : "#f44336",
                      fontWeight: "bold"
                    }}
                  >
                    {resultado.disponibilidad}
                  </CeldaTabla>
                  <CeldaTabla>{resultado.turnos} turnos</CeldaTabla>
                  <CeldaTabla>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handleRedirectToService(resultado.id)}
                      disabled={resultado.disponibilidad !== "Disponible"}
                    >
                      Ver servicio
                    </Button>
                  </CeldaTabla>
                </FilaTabla>
              ))
            ) : (
              <FilaTabla>
                <CeldaTabla colSpan="5" style={{textAlign: 'center'}}>
                  No hay resultados disponibles
                </CeldaTabla>
              </FilaTabla>
            )}
          </tbody>
        </TablaResultados>
      </ResultadosContainer>
    )}
    </>
  );
};

export default Buscador;
