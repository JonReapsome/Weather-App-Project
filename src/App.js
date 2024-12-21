import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const API_KEY = '658df01baa0bbf4eddbbce1f756a29f6';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
      setError('');
      
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red'}}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;