import React, { useState, useEffect, useRef } from "react";
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

import Banner from "/src/assets/banner_chica.jpg";
import IsologoImg from "/src/assets/isologo_light.svg";
import servicesData from "../../Utils/servicios.json";

const Buscador = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);
  //const [searchDate, setSearchDate] = useState('');
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
    if (hasSelected && query !== selectedService?.name) {
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

  const limpiarBusqueda = () => {
    setQuery("");
  };

  return (
    <ContenedorBuscador>
      <FondoBanner src={Banner} alt="Fondo banner" />
      <ContenedorContenido>
        <Isologo src={IsologoImg} alt="Glowin Isologo" />
        <BarraBusqueda>
          <CampoBusqueda
            ref={inputRef}
            variant="outlined"
            placeholder="Buscando..."
            fullWidth
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            //aria-expanded={showSuggestions}
            aria-owns="suggestions-list"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="suggestions-list"
              ref={suggestionsContainerRef}
              className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow-lg"
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? 'bg-blue-100' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="font-medium">{suggestion.nombre}</div>
                  {suggestion.description && (
                    <div className="text-sm text-gray-600">{suggestion.descripcion}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <BotonLimpiar onClick={limpiarBusqueda}>
            <CleaningServicesIcon />
          </BotonLimpiar>
          {query && (
            <button
              type="button"
              onClick={handleClearSelection}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Limpiar búsqueda"
            >
              Equis
            </button>
          )}
        </BarraBusqueda>
        {console.log("Servicio seleccionado:", selectedService)}

        <BotonBuscar>Realizar Búsqueda</BotonBuscar>
      </ContenedorContenido>
    </ContenedorBuscador>
  );
};

export default Buscador;
