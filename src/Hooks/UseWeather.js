// src/hooks/useWeather.js
import { useState, useEffect, useCallback } from 'react';
import { getWeatherData } from '../Services/WeatherService';

// Custom hook for weather data
export const useWeather = (initialCity = '') => {
  // State management
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState(initialCity);
  
  // Fetch weather data
  const fetchWeather = useCallback(async (searchCity) => {
    // Don't fetch if city is empty
    if (!searchCity.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const data = await getWeatherData(searchCity);
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies - function never changes
  
  // Effect to fetch weather when city changes
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, fetchWeather]);
  
  // Search function
  const searchWeather = useCallback((searchCity) => {
    const trimmedCity = searchCity.trim();
    if (trimmedCity && trimmedCity !== city) {
      setCity(trimmedCity);
    }
  }, [city]);
  
  // Refresh function
  const refreshWeather = useCallback(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, fetchWeather]);
  
  // Return everything the component needs
  return {
    weatherData,
    isLoading,
    error,
    searchWeather,
    refreshWeather,
    currentCity: city
  };
};
