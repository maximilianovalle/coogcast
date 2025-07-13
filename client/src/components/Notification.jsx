import './Notification.css';
import { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

function Notification() {

    const [showNotif, setShowNotif] = useState(1);

    return (<>
        { showNotif ? (
                <div id="notifBody">
                    <IoCloseOutline className='notifIcon' onClick={() => setShowNotif(0)}/>

                    <h2>Notice</h2>
                    <p><strong>Data may take a minute to load!</strong> Coogcast is hosted on free platforms that sometimes need a second to wake up - if you see "--" in place of numbers, please allow some time for the site to fully render!</p>
                </div>
        ) : (<></>) }
    </>)
}

export default Notification