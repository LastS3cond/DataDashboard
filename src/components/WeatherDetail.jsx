// WeatherDetail.jsx
import React from 'react';
import { useState, useEffect } from 'react'
const WeatherDetail = (props) => {
  // Retrieve the timestamp from the query parameter
  const searchParams = new URLSearchParams(window.location.search);
  const timeStamp = searchParams.get('timeStamp');
  const [counter, setCounter] = useState(0);

  useEffect(() => { 
    for(let i = 0; i < props.data.length; i++){
      if(props.data[i].timestamp_local === timeStamp){
          setCounter(i)
        break;
      }
  }
}, [props.data]);


  return (
    <div className='HourlyDetails'>
        <h2>Hourly Details for {(props.data[counter].timestamp_local).substring(5,10)} {(props.data[counter].timestamp_local).substring(11,16)}</h2>
        <p>Forecast: {props.data[counter].weather.description}</p>
        <p>Temp: {props.data[counter].temp}°F</p>
        <p>Perceived Temp: {props.data[counter].app_temp}°F</p>
        <p>Humidity: {props.data[counter].rh}%</p>
        <p>Chance of Rain: {props.data[counter].pop}%</p>
        <p>Precipitation: {props.data[counter].precip} inches</p>
        <p>Cloud Coverage: {props.data[counter].clouds}%</p>
        <p>Wind Speed: {props.data[counter].wind_spd} MPH</p>
        <p>Wind Gust Speed: {props.data[counter].wind_gust_spd} MPH</p>
        <p>UV Index: {props.data[counter].uv}</p>
        <p>Visibility: {props.data[counter].vis} miles</p>
        <p>Ozone: {props.data[counter].ozone} Dobson units</p>
    </div>
  );
};

export default WeatherDetail;
