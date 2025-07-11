import { useState, useEffect } from 'react';
import axios from 'axios';
import './divs.css';

import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from 'react-chartjs-2';

function GraphsDiv() {
    const [tempArr, setTempArr] = useState([]);
    const [humidArr, setHumidArr] = useState([]);
    const [hoursArr, setHours] = useState([]);

    const getPast = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/weather/past`);
        const snapshots = response.data;

        const timestamps = snapshots.map(row => {
            const hourObject = new Date(row.timestamp);
            const hours = hourObject.getHours();
            const minutes = hourObject.getMinutes();

            const AMPM = hours >= 12 ? 'PM' : 'AM';
            const hoursFormatted = hours > 12 ? hours - 12 : hours;
            const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
            return `${hoursFormatted}:${minutesFormatted} ${AMPM}`;
        });

        const temp_fahrenheit = snapshots.map(row => row.temp_fahrenheit);
        const humidity = snapshots.map(row => row.humidity);

        setHours(timestamps);
        setTempArr(temp_fahrenheit);
        setHumidArr(humidity);
    }

    useEffect(() => {
        getPast();
    }, []);


    // graph tab component

    const [tempDiv, setTempDiv] = useState(1);
    const [humidDiv, setHumidDiv] = useState(0);

    const clickTempDiv = () => {
        setTempDiv(1);
        setHumidDiv(0);
    }

    const clickHumidDiv = () => {
        setHumidDiv(1);
        setTempDiv(0);
    }


    // red active tab

    const underlineTemp = {
        borderBottom: tempDiv ? '4px solid #960C22' : '4px solid transparent',
        color: tempDiv ? '#960C22' : '',
    };

    const underlineHumid = {
        borderBottom: humidDiv ? '4px solid #960C22' : '4px solid transparent',
        color: humidDiv ? '#960C22' : '',
    };


    return ( <div className='divContainer'>

        <div id="graphsHeader">
            <button onClick={() => clickTempDiv()} style={underlineTemp}><h2 id="tempTitle">Recent Temperature</h2></button>
            <button onClick={() => clickHumidDiv()} style={underlineHumid}><h2 id="humidityTitle">Recent Humidity</h2></button>
        </div>

        {/* temperature graph */}

        { tempDiv ? (
            <div id="tempGraph">
                <Line 
                    data={{
                        labels: hoursArr, // x-axis
                        datasets: [
                            {
                                label: "Fahrenheit",
                                data: tempArr, // y-axis
                                borderColor: '#C8102E',
                                backgroundColor: '#C8102E'
                            }
                        ]
                    }}

                    options={{
                        scales: {
                            x: {
                                ticks: {
                                    color: 'black',
                                    font: {
                                        size: 14,
                                    }
                                }
                            },
                            y: {
                                suggestedMin: 65,
                                suggestedMax: 65,
                                ticks: {
                                    color: 'black',
                                    font: {
                                        size: 14,
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        ) : (<></>)}

        {/* humidity graph */}

        { humidDiv ? (
            <div id="humidityGraph">
                <Bar 
                    data={{
                        labels: hoursArr, // x-axis
                        datasets: [
                            {
                                label: "%",
                                data: humidArr, // y-axis
                                backgroundColor: '#C8102E'
                            }
                        ]
                    }}

                    options={{
                        scales: {
                            x: {
                                ticks: {
                                    color: 'black',
                                    font: {
                                        size: 14,
                                    }
                                }
                            },
                            y: {
                                suggestedMax: 100,
                                ticks: {
                                    color: 'black',
                                    font: {
                                        size: 14,
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        ) : (<></>)}

    </div> )
}

export default GraphsDiv