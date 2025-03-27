// Componente para la lista de sugerencias
//import SuggestionItem from "./SuggestionItem";
//import './SuggestionList.css'; // Import your CSS file
// Componente para la lista de sugerencias
import React from "react";
import styled from "styled-components";

const SuggestionContainer = styled.div`
  position: absolute;
  width: 80%;
  top:80%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  ${props => props.selected && `
    background-color: #e3f2fd;
  `}
`;

const NoSuggestionsMessage = styled.div`
  padding: 10px 16px;
  color: #757575;
  font-style: italic;
`;

const SuggestionsList = ({ suggestions, selectedIndex, onSuggestionClick, containerRef, isTyping }) => {
  // Solo retornamos null si no hay sugerencias Y el usuario no está escribiendo
  if (suggestions.content.length === 0 && !isTyping) return null;

  return (
    <SuggestionContainer ref={containerRef}>
      {suggestions.content.length > 0 ? (
        suggestions.content.map((suggestion, index) => (
          <SuggestionItem 
            key={suggestion.id} 
            selected={index === selectedIndex}
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion.nombre}
          </SuggestionItem>
        ))
      ) : (
        isTyping && <NoSuggestionsMessage>No hay sugerencias</NoSuggestionsMessage>
      )}
    </SuggestionContainer>
  );
};

export default SuggestionsList;