// src/components/WeatherDisplay.js
import React from 'react';
import '../styles/WeatherDisplay.css';

function WeatherDisplay(props) {
  return (
    <div className="weather-card">
      <h2 className="city-name">
        {props.city}, {props.country}
      </h2>
      
      <div className="weather-icon-container">
        <img 
          src={props.iconUrl} 
          alt={props.description}
          className="weather-icon"
        />
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          {props.temperature}°{props.unit}
        </div>
        <div className="description">{props.description}</div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like:</span>
          <span className="detail-value">
            {props.feelsLike}°{props.unit}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{props.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed:</span>
          <span className="detail-value">{props.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
