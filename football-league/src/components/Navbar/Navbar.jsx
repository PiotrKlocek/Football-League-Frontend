import React, {useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import './Navbar.css';
import soccerLogo from "../../assets/ball2.png";


const Navbar = () => {
    const [theme,setTheme] = useState('light');

    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    return (
        <div className={`navbar ${theme}`}>
            <img src={soccerLogo} alt="Soccer logo" className="logo" />
            <ul>
                <li>Home</li>
                <li>League</li>
                <li>Players</li>
            </ul>
            <div className="search-box">
                <input type="text" placeholder="Search" />
                <FaSearch className="search-icon" />
            </div>
            <FaMoon className="dark-mode-toggle" onClick={toggle_mode} />
        </div>
    );
}

export default Navbar;
