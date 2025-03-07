import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/searchw.png';
import clear_icon from '../assets/weather.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/storm.png';
import rain_showers from '../assets/img5.png';
import thunderstorms from '../assets/img1.avif';
import light_rain from '../assets/img4.png';
import partly_cloudly from '../assets/img2.webp';
import mist_icon from '../assets/mist.webp';
import cloudy_icon from '../assets/cloudy.webp';
 
 
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);  

  const allIcons = { 
    "1000": clear_icon,  
    "1003": partly_cloudly,
    "1006": cloudy_icon, 
    "1009": partly_cloudly, 
    "1030": mist_icon, 
    "1063": rain_showers,
    "1183": light_rain,
    "1240": light_rain,  
    "1276": thunderstorms
  };

  const search = async (city) => {

    if(city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${city}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);    // it will display data into console 
      if(!response.ok) {
        alert("city not found");
        return;
      }
      const iconCode = data.current.condition.code.toString();
      const icon = allIcons[iconCode] || clear_icon; // given icons from my side 

      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        location: `${data.location.name}, ${data.location.country}`,
        icon: icon,
      });
    } catch (error) {
      console.error("Error in fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>

      {/* using Ternary operator  */}
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}{"\u00B0"}C</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
