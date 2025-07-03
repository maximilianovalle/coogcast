import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

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

  return (
    <>
    {array.map((fruit, index) => 
        <p key={index}>{fruit}</p>
    )}
    </>
  )
}

export default App
