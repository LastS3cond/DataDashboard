import { useState, useEffect } from 'react'
const ACCESS_KEY = "f67c7deadb4e4396a8a92c5e0745c14a"
import './App.css'
import Card from './components/Card.jsx'
import axios from "axios";

function App() {

  const [allTemp, setAllTemp] = useState([]);

  useEffect(() => {
    const parse = async () => {
        const response = await axios.get("https://api.weatherbit.io/v2.0/forecast/hourly?city=Raleigh,NC&key=f67c7deadb4e4396a8a92c5e0745c14a&hours=48");
        setAllTemp(response.data);  
    };
    parse(); 
  },[]); // Only does this on the initial render

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
          {/* <Card header="Average Day Temp" body={dayTemp}/>
          <Card header="Average Night Temp" body={nightTemp}/> */}
          <Card header="Balls" body="balls" />
        </div>
        <div className="mainContent">
          <Card header="Balls" body="balls" />
          <Card header="Balls" body="balls" />
          <Card header="Balls" body="balls" />
        </div>
      </div>
      {allTemp.map((data) => (
        <p>Time: {data.ts} Temp: {data.temp}</p>
      ))}
    </>
  )
}

export default App
