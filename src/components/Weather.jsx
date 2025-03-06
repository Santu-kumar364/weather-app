 

import React from 'react';
import './Weather.css';
import search_icon from '../assets/searchw.png';
import final_icon from '../assets/weather.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/storm.png';


const Weather = () => {
  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder='Search' />
        <img src={search_icon} alt="" />
      </div>

      <img src={final_icon} alt="" className='weather-icon' />
      <p className='temperature'>16{"\u00B0"}C</p>
      <p className='location'>India</p>

       
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>3.6 Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Weather;
