// src/App.js
import React, { useEffect, useMemo } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { useWeather } from './Hooks/UseWeather';
import { useLocalStorage } from './Hooks/UseLocalStorage';

function App() {
  // Use custom hooks
  const { 
    weatherData, 
    isLoading, 
    error, 
    searchWeather, 
    refreshWeather,
    currentCity 
  } = useWeather();
  
  // Store last searched cities
  const [recentCities, setRecentCities] = useLocalStorage('recentCities', []);
  
  // Store temperature unit preference
  const [unit, setUnit] = useLocalStorage('temperatureUnit', 'C');
  
  // Convert temperature based on unit (memoized for performance)
  const displayTemperature = useMemo(() => {
    if (!weatherData) return null;
    
    if (unit === 'F') {
      return Math.round((weatherData.temperature * 9/5) + 32);
    }
    return weatherData.temperature;
  }, [weatherData, unit]);
  
  const displayFeelsLike = useMemo(() => {
    if (!weatherData) return null;
    
    if (unit === 'F') {
      return Math.round((weatherData.feelsLike * 9/5) + 32);
    }
    return weatherData.feelsLike;
  }, [weatherData, unit]);
  
  // Handle search with recent cities tracking
  const handleSearch = (city) => {
    searchWeather(city);
    
    // Update recent cities (keep last 5)
    setRecentCities(prev => {
      const updated = [city, ...prev.filter(c => c !== city)];
      return updated.slice(0, 5);
    });
  };
  
  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };
  
  // Load default city on mount
  useEffect(() => {
    if (!currentCity) {
      // Try to get user's location or load last searched city
      const lastCity = recentCities[0] || 'London';
      searchWeather(lastCity);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>React Weather App</h1>
        <button 
          className="unit-toggle"
          onClick={toggleUnit}
          aria-label="Toggle temperature unit"
        >
          °{unit}
        </button>
      </header>
      
      <SearchBar onSearch={handleSearch} />
      
      {/* Show recent cities if any */}
      {recentCities.length > 0 && !isLoading && (
        <div className="recent-cities">
          <span>Recent: </span>
          {recentCities.map((city, index) => (
            <button
              key={`${city}-${index}`}
              className="recent-city-btn"
              onClick={() => handleSearch(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
      
      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}
      
      {weatherData && !isLoading && (
        <>
          <WeatherDisplay 
            city={weatherData.city}
            country={weatherData.country}
            temperature={displayTemperature}
            description={weatherData.description}
            feelsLike={displayFeelsLike}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            iconUrl={weatherData.iconUrl}
            unit={unit}
          />
          <button 
            className="refresh-btn"
            onClick={refreshWeather}
            aria-label="Refresh weather data"
          >
            🔄 Refresh
          </button>
        </>
      )}
    </div>
  );
}

export default App;
