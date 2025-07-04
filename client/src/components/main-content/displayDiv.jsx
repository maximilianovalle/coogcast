import './divs.css';

function DisplayDiv() {
    return ( <div className='infoContainer'>

        <div id="infoHeader">
            <h2>July 2, 2025</h2>
            <h2>2:00 PM</h2>
        </div>

        <div>
            <h1 id="infoTemp">94 °F / 33 °C</h1>
            <h3 id="infoHumidity">44% humidity</h3>
        </div>

    </div> )
}

export default DisplayDiv