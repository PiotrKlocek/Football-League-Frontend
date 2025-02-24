import React, {useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import './Navbar.css';
import {useNavigate} from "react-router-dom";




const Navbar = () => {
    let navigate = useNavigate();
    const [theme,setTheme] = useState('light');

    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const logout = () => {
        navigate("/");
    }

    const home = () =>{
        navigate("/homepage");

    }

    return (
        <div className={`navbar ${theme}`}>
            <IoMdLogOut className="logout-icon" onClick={logout} />
            <ul>
                <li onClick={home}>Home</li>
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
