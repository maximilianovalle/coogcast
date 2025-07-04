import './HeaderFooter.css';
import githubIcon from '../assets/github.svg';

function Header() {
    return (<div id="header">

        <h1 className='text'>Cougar<span>cast</span></h1>
        <a href="https://github.com/maximilianovalle/iot-environment-monitor" target="_blank" rel="noopener noreferrer"><img className='icon' src={githubIcon} alt="Github" /></a>

    </div>)
}

export default Header