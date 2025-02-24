import React, { useState } from 'react';
import { FaSearch, FaMoon } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";



const Navbar = ({ setTheme }) => {
    let navigate = useNavigate();
    const [theme, setThemeState] = useState('dark');

    const toggle_mode = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setThemeState(newTheme);
    };

    const logout = () => {
        navigate("/");
    };

    const home = () => {
        navigate("/homepage");
    };

    return (
        <div className={`navbar ${theme}`}>
            <IoMdLogOut className="logout-icon" onClick={logout} />
            <ul>
                <li onClick={home}> <IoHomeOutline /> Home</li>
                <li>Leagues</li>
                <li>Players</li>
                <li>Referees </li>
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
