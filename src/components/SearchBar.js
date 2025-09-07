// src/components/SearchBar.js
import React, { useState } from 'react';  // Import useState Hook
import '../styles/SearchBar.css';

function SearchBar(props) {
  // useState Hook - managing input value
  // Syntax: const [stateName, setStateName] = useState(initialValue)
  const [inputValue, setInputValue] = useState('');
  
  // Event handler for input changes
  const handleInputChange = (event) => {
    // event.target.value contains the current input text
    setInputValue(event.target.value);
  };
  
  // Event handler for search button click
  const handleSearch = () => {
    // Check if input is not empty
    if (inputValue.trim() !== '') {
      // Call the parent's function passed through props
      props.onSearch(inputValue);
      // Clear input after search
      setInputValue('');
    }
  };
  
  // Event handler for Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Enter city name..."
        value={inputValue}              // Controlled component - value from state
        onChange={handleInputChange}     // Update state on every keystroke
        onKeyPress={handleKeyPress}      // Handle Enter key
      />
      <button 
        className="search-button"
        onClick={handleSearch}           // Handle button click
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
