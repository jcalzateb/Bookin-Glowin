import "./SuggestionItem.css";

//Componente para mostrar cada sugerencia
const SuggestionItem = ({ suggestion, isSelected, onClick }) => {
  return (
    <li 
      className={`suggestion-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(suggestion)}
      role="option"
      aria-selected={isSelected}
    >
      <div className="suggestion-name">{suggestion.name}</div>
      {suggestion.description && (
        <div className="suggestion-description">{suggestion.description}</div>
      )}
    </li>
  );
};

export default SuggestionItem;