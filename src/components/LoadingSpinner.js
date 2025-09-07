// src/components/LoadingSpinner.js
import React from 'react';
import '../styles/LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
}

export default LoadingSpinner;
