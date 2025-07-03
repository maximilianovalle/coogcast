import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (<>
    <Header />

    <div id="contentBody">
      
      <div id="informationContainer">

      </div>

      <div id="graphsContainer">

      </div>

    </div>

    <Footer />
  </>)
}

export default App
