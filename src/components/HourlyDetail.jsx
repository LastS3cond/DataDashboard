import React, { Component, useEffect, useState } from "react";
import '../App.css'

const HourlyDetail = (props) => {
console.log(props.data)
    
return (
    <div className="mainContent">
        <div>
        <p>Time: {(props.data.timestamp_local).substring(5,10)} {(props.data.timestamp_local).substring(11,16)}</p>
        <p>Temp: {props.data.temp}°F</p>
        <p>Chance of Rain: {props.data.pop}%</p>
        <p>Forecast: {props.data.weather.description}</p>
        <p>Precipitation: {props.data.precip} inches</p>
        </div>
    </div>  
);
};

export default HourlyDetail;