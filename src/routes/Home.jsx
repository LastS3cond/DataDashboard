import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip,
} from "recharts"
const Home = (props) => {

  const [filteredData, setFilteredData] = useState([]);
  const [avgDayTemp, setAvgDayTemp] = useState(0);
  const [avgNightTemp, setAvgNightTemp] = useState(0);
  const [avgDayWind, setAvgDayWind] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => { 
    setFilteredData(props.data);
    var dayCounter = 0;
    var nightCounter = 0;
    var windAvg = 0;
    var dayTemp = 0;
    var nightTemp = 0;
    for (let i = 0; i < (props.data.length); i++ ){
      if (props.data[i].pod === "d") {
        dayTemp = dayTemp + props.data[i].app_temp;
        dayCounter++;
      }
      if (props.data[i].pod === "n") {
        nightTemp = nightTemp + props.data[i].app_temp;
        nightCounter++;
      }
      windAvg = windAvg + props.data[i].wind_spd;
    }
    setAvgDayTemp((dayTemp/dayCounter).toFixed());
    setAvgNightTemp((nightTemp/nightCounter).toFixed());
    setAvgDayWind((windAvg/(dayCounter+nightCounter)).toFixed());
    setSelectedType("all");
    setUpChart();
  }, [props.data]);
  
  const setUpChart =() =>{
      let chart = [];
        for (let i = 0; i < (props.data.length); i++ ){
          chart.push({"time":`${props.data[i].timestamp_local.substring(5,10)}|${props.data[i].timestamp_local.substring(11,16)}`, "Hourly Temp":props.data[i].temp})
        setChartData(chart)
    }
  }

  useEffect(() => {
    let newData = []
    for (let i = 0; i < (props.data.length); i++ ){
      if (props.data[i].timestamp_local.toLowerCase().includes(searchInput.toLowerCase()) ){
        newData.push(props.data[i])
      }
    }
    setFilteredData(newData);
  }, [searchInput]);

  useEffect(() => {
      let newData = []
      if (selectedType === "night") {
        for (let i = 0; i < (props.data.length); i++ ){
          if (props.data[i].pod === "n") {
            newData.push(props.data[i])
          }
        }
        setFilteredData(newData);
      }
      else if (selectedType === "day") {
        for (let i = 0; i < (props.data.length); i++ ){
          if (props.data[i].pod === "d") {
            newData.push(props.data[i])
          }
        }
        setFilteredData(newData);
      } else if (selectedType === "rainy") {
        for (let i = 0; i < (props.data.length); i++ ){
          if (props.data[i].precip > 0) {
            newData.push(props.data[i])
          }
        }
        setFilteredData(newData);
      } else if (selectedType === "dry") {
        for (let i = 0; i < (props.data.length); i++ ){
          if (props.data[i].precip == 0) {
            newData.push(props.data[i])
          }
        }
        setFilteredData(newData);
      } else {
          setFilteredData(props.data);
      }
  }, [selectedType]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  console.log(chartData)

  return (
      <div className='content'>
        {chartData.length > 0 &&
         <LineChart width={730} height={250} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" >
          <Label value="Datetime over a 5 Day Period" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Temperature in Farenheit" angle={-90} offset={100} position="insideBottom" />
        </YAxis>
        <Line type="monotone" dataKey="Hourly Temp" stroke="#8884d8" />
          <Tooltip />
      </LineChart> }
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
            placeholder="Search by Time or Day"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="search-input"
        />
      </div>
      <div className="mainContent">
        {filteredData.map((dataPoint) => (
        <div className="WeatherInfo" key={dataPoint.timestamp_local} 
        onClick={() =>
          navigate(
            `/weatherDetails?timeStamp=${dataPoint.timestamp_local}`
          )
        }
        >
          <p>Time: {(dataPoint.timestamp_local).substring(5,10)} {(dataPoint.timestamp_local).substring(11,16)}</p>
          <p>Temp: {dataPoint.temp}°F</p>
          <p>Chance of Rain: {dataPoint.pop}%</p>
          {/* <p>Forecast: {filteredData.weather.description}</p> */}
          {/* <p>Precipitation: {filteredData.precip} inches</p> */}
        </div>
        ))}
      </div>
    </div>
  );
};

export default Home;