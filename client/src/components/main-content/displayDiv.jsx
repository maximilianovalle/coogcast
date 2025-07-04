import './divs.css';

function DisplayDiv() {
    return ( <div id="displayDiv" className='divContainer'>

        <div id="infoHeader">
            <h2>3:12 PM</h2>
            <h2>July 3, 2025</h2>
        </div>

        <div>
            <h1 id="infoTemp">94 °F</h1>
            <h3 id="infoHumidity">44% humidity</h3>
        </div>

    </div> )
}

export default DisplayDiv