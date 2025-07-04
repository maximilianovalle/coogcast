import { useState, useEffect } from 'react';
import axios from 'axios';
import './divs.css';

function DisplayDiv() {
    const [tempF, setTempF] = useState();
    const [humidity, setHumidity] = useState();
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");

    const getRecent = async () => {
        const response = await axios.get("http://localhost:8080/getRecent");
        
        const timestamp = response.data.timestamp;
        const dateObject = new Date(Date.parse(timestamp));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        const hourObject = new Date(timestamp);
        const hours = hourObject.getHours();
        const minutes = hourObject.getMinutes();
        const hoursFormatted = hours < 10 ? '0' + hours : hours;
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
        const AMPM = hours >= 12 ? 'PM' : 'AM';

        setDate(dateObject.toLocaleDateString('en-US', options));
        setHour(`${hoursFormatted}:${minutesFormatted} ${AMPM}`);
        setTempF(response.data.temp_fahrenheit);
        setHumidity(response.data.humidity)

        console.log("Retreived temperature + humidity snapshot.");
    };

    useEffect(() => {
        getRecent();
    }, []);

    return ( <div id="displayDiv" className='divContainer'>

        <div id="infoHeader">
            <h2>{hour}</h2>
            <h2>{date}</h2>
        </div>

        <div>
            <h1 id="infoTemp">{tempF} °F</h1>
            <h3 id="infoHumidity">{humidity}% humidity</h3>
        </div>

    </div> )
}

export default DisplayDiv