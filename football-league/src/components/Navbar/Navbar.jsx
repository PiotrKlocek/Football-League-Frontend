import React, { useState } from 'react';
import { FaSearch, FaMoon } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import './Navbar.css';
import { useNavigate } from "react-router-dom";



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

    const leagues = () => {
        navigate("/leagues");
    };

    return (
        <div className={`navbar ${theme}`}>
            <IoMdLogOut className="logout-icon" onClick={logout} />
            <ul>
                <li onClick={home}> Home</li>
                <li onClick={leagues}>Leagues </li>
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
