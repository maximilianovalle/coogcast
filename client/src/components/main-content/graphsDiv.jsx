import { useState } from 'react';
import './divs.css';

function GraphsDiv() {
    
    const [isTemp, setIsTemp] = useState("true");

    const tempClicked = () => {
        // TODO: add .underlined class to #tempTitle
        // TODO: remove .underlined class from #humidityTitle if present
        setIsTemp("true");
    }

    const humidityClicked = () => {
        // TODO: add .underlined class to #humidityTitle
        // TODO: remove .underlined class from #tempTitle if present
        setIsTemp("false");
    }

    return ( <div className='divContainer'>

        <div id="graphsHeader">
            <button><h2 id="tempTitle">Temperature</h2></button>
            <button><h2 id="humidityTitle">Humidity</h2></button>
        </div>

        {/* TODO: display #tempGraph when isTemp = true */}
        <div id="tempGraph">

        </div>

        {/* TODO: display #humidityGraph when isTemp = false */}
        <div id="humidityGraph">

        </div>

    </div> )
}

export default GraphsDiv