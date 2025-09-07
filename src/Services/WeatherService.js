// src/services/weatherService.js

// Get environment variables
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

// Check if API key exists
if (!API_KEY) {
  console.error('No API key found! Please add REACT_APP_API_KEY to .env file');
}

// Function to fetch weather data
export const getWeatherData = async (city) => {
  try {
    // Build the complete URL with query parameters
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    // Make API request
    const response = await fetch(url);
    
    // Check if response is ok (status 200-299)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else if (response.status === 401) {
        throw new Error('Invalid API key');
      } else {
        throw new Error('Something went wrong');
      }
    }
    
    // Parse JSON data
    const data = await response.json();
    
    // Transform data to our format
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
    
  } catch (error) {
    // Re-throw the error to handle it in the component
    throw error;
  }
};
