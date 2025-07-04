import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DisplayDiv from './components/main-content/displayDiv.jsx';
import GraphsDiv from './components/main-content/graphsDiv.jsx';

function App() {
  return (<div>
    <Header />

    <div id="contentBody">
      
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
