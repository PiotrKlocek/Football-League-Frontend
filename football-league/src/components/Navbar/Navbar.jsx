import React, { useState } from "react";
import { FaSearch, FaMoon } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setTheme }) => {
    let navigate = useNavigate();
    const [theme, setThemeState] = useState("dark");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const toggle_mode = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setThemeState(newTheme);
    };

    const logout = () => navigate("/");
    const home = () => navigate("/homepage");
    const leagues = () => navigate("/leagues");

    const teams = () => navigate("/teams");
    const referees = () => navigate("/referees");


    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.length > 2) {
            try {
                const response = await fetch(`http://localhost:8080/api/search?query=${e.target.value}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Błąd wyszukiwania:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className={`navbar ${theme}`}>
            <IoMdLogOut className="logout-icon" onClick={logout} />
            <ul className="links">
                <li onClick={home}>Home</li>
                <li onClick={leagues}>Leagues</li>
                <li onClick={teams}>Teams</li>
                <li onClick={referees}>Referees</li>
            </ul>
            <div className="search-box">
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                <FaSearch className="search-icon" />
                {searchResults.length > 0 && (
                    <ul className="search-results">
                        {searchResults.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <FaMoon className="dark-mode-toggle" onClick={toggle_mode} />
        </div>
    );
};

export default Navbar;
