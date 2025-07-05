import { useState, useEffect } from 'react';
import axios from 'axios';
import './divs.css';

import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from 'react-chartjs-2';

function GraphsDiv() {
    // graph data

    const [tempArr, setTempArr] = useState([]);
    const [humidArr, setHumidArr] = useState([]);
    const [hoursArr, setHours] = useState([]);

    const [TEST_TEMP_ARR, SET_TEST_TEMP_ARR] = useState([35.6, 42.2, 40.3, 31.2, 92.8]);
    const [TEST_HUMID_ARR, SET_TEST_HUMID_ARR] = useState([50.1, 48.9, 53, 49, 52.6, 100]);
    const [TEST_HOURS_ARR, SET_TEST_HOURS_ARR] = useState(["2:52 PM", "12:57 PM", "12:43 PM", "3:12 PM", "2:05 PM"])

    const getPast = async () => {
        const response = await axios.get('http://localhost:8080/getRecent');
        // TODO: receive backend JSON response and store in appropriate arrays
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


    // red tab underline

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
                        labels: TEST_HOURS_ARR, // x-axis
                        datasets: [
                            {
                                label: "Fahrenheit",
                                data: TEST_TEMP_ARR, // y-axis
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
                        labels: TEST_HOURS_ARR, // x-axis
                        datasets: [
                            {
                                label: "%",
                                data: TEST_HUMID_ARR, // y-axis
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