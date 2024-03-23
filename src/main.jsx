import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './routes/Home.jsx';
import WeatherDetail from './components/WeatherDetail.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} >
        <Route path="home" element={<Home />} />
        {/* <Route path="WeatherDetails" element={<WeatherDetail />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
