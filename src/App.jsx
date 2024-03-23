import { useState, useEffect } from 'react'
const ACCESS_KEY = "b859e6648ad74453b64963bcc49c3f7a"
import './App.css'
import Home from './routes/Home.jsx'
import WeatherDetail from './components/WeatherDetail.jsx'
import axios from "axios";
import { Route, Routes, Link } from "react-router-dom";

function App() {

  const [allTemp, setAllTemp] = useState([]);


  useEffect(() => {
    const parse = async () => {
      const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?&city=blacksburg&country=US&hours=120&units=I&key=${ACCESS_KEY}`);
      setAllTemp(response.data.data);
    };
    parse();
  }, []); // Only does this on the initial render


  return (
    <>
      <nav className="sideBar">
        <h1> Rainy Days </h1>
        {/* <Link to="/home">Home</Link> */}
        <h1></h1>
        {/* <Link to="/home">Search</Link> */}
      </nav>

      <Routes>
        <Route index element={<Home data={allTemp} />} />
        <Route path="home" element={<Home data={allTemp} />} />
        {/* <Route path="WeatherDetails" element={<WeatherDetail data={allTemp} />} /> */}
        <Route path="*" element={<Home data={allTemp} />} />
      </Routes>
    </>
  )
};

export default App
