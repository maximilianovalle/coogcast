import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DisplayDiv from './components/main-content/displayDiv.jsx';
import GraphsDiv from './components/main-content/graphsDiv.jsx';

import { FaLocationDot } from "react-icons/fa6";

function App() {
  return (<div>
    <Header />

    <div id="contentBody">

      <div id="contentHeader">
        <h1>University of Houston</h1>
        <h3><FaLocationDot /> 4302 University Dr, Houston, TX 77004</h3>
      </div>
      
      <DisplayDiv />

      <GraphsDiv />

      <div id="littlePaw">
        <p>Meet <a href="https://github.com/maximilianovalle/little-paw" target="_blank" rel="noopener noreferrer">Little Paw</a>, the IoT device working to serve you this data!</p>
      </div>

    </div>

    <Footer />
  </div>)
}

export default App
