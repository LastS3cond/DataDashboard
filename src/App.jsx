import { useState, useEffect } from 'react'
const ACCESS_KEY = "f67c7deadb4e4396a8a92c5e0745c14a"
import './App.css'
import Card from './components/Card.jsx'
import axios from "axios";

function App() {

  const [allTemp, setAllTemp] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [avgDayTemp, setAvgDayTemp] = useState(0);
  const [avgNightTemp, setAvgNightTemp] = useState(0);
  const [avgDayWind, setAvgDayWind] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const parse = async () => {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?&city=blacksburg&country=US&hours=120&units=I&key=${ACCESS_KEY}`);
        setAllTemp(response.data.data);  
        setFilteredData(response.data.data);
    };
    parse(); 
  },[]); // Only does this on the initial render

  useEffect(() => { 
    var dayCounter = 0;
    var nightCounter = 0;
    var windAvg = 0;
    var dayTemp = 0;
    var nightTemp = 0;
    for (let i = 0; i < (allTemp.length); i++ ){
      if (allTemp[i].pod === "d") {
        dayTemp = dayTemp + allTemp[i].app_temp;
        dayCounter++;
      }
      if (allTemp[i].pod === "n") {
        nightTemp = nightTemp + allTemp[i].app_temp;
        nightCounter++;
      }
      windAvg = windAvg + allTemp[i].wind_spd;
    }
    setAvgDayTemp((dayTemp/dayCounter).toFixed());
    setAvgNightTemp((nightTemp/nightCounter).toFixed());
    setAvgDayWind((windAvg/(dayCounter+nightCounter)).toFixed());
  }, [allTemp]);
  

  useEffect(() => {
    let newData = []
    for (let i = 0; i < (allTemp.length); i++ ){
      if (allTemp[i].timestamp_local.toLowerCase().includes(searchInput.toLowerCase()) ){
        newData.push(allTemp[i])
      }
    }
    setFilteredData(newData);
  }, [searchInput]);

  useEffect(() => {
      let newData = []
      if (selectedType === "night") {
        for (let i = 0; i < (allTemp.length); i++ ){
          if (allTemp[i].pod === "n") {
            newData.push(allTemp[i])
          }
        }
        setFilteredData(newData);
      }
      else if (selectedType === "day") {
        for (let i = 0; i < (allTemp.length); i++ ){
          if (allTemp[i].pod === "d") {
            newData.push(allTemp[i])
          }
        }
        setFilteredData(newData);
      } else if (selectedType === "rainy") {
        for (let i = 0; i < (allTemp.length); i++ ){
          if (allTemp[i].precip > 0) {
            newData.push(allTemp[i])
          }
        }
        setFilteredData(newData);
      } else if (selectedType === "dry") {
        for (let i = 0; i < (allTemp.length); i++ ){
          if (allTemp[i].precip == 0) {
            newData.push(allTemp[i])
          }
        }
        setFilteredData(newData);
      } else {
          setFilteredData(allTemp);
      }
  }, [selectedType]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
  <>
    <div className="sideBar">
      <h1> Rainy Days </h1>
      <h1> Home </h1>
      <h1> Search </h1>
      <h1> About </h1>

    </div>
    <div className='content'>
      <div className='topBar'>
        <h1>    Average Day Temperature: {avgDayTemp}°F  </h1>
        <h1>    Average Night Temperature: {avgNightTemp}°F   </h1>
        <h1>    Average Wind Speed: {avgDayWind} MPH  </h1>
      </div>
      <div className="selectors">
        <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="day">DayTime</option>
            <option value="night">NightTime</option>
            <option value="rainy">Rainy</option>
            <option value="dry">Dry</option>
        </select>
        <input
            type="text"
            placeholder="Search by Time"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="search-input"
        />
      </div>
      <div className="mainContent">
        {filteredData.map((filteredData) => (
        <div>
          <p>Time: {(filteredData.timestamp_local).substring(5,10)} {(filteredData.timestamp_local).substring(11,16)}</p>
          <p>Temp: {filteredData.temp}°F</p>
          <p>Chance of Rain: {filteredData.pop}%</p>
          <p>Forecast: {filteredData.weather.description}</p>
          <p>Precipitation: {filteredData.precip} inches</p>
        </div>
        ))}
      </div>
    </div>
  </>
  )
};

export default App
