import React, { useState } from 'react';
import './HomePage.css';
import Navbar from "../Navbar/Navbar.jsx";
import MatchesTable from "../MatchesTable/MatchesTable.jsx";


const HomePage = () => {
    const [theme, setTheme] = useState('dark');
    return (
        <>
            <Navbar theme={theme} setTheme={setTheme} />
            <MatchesTable theme={theme} />

        </>
    );
};
export default HomePage;
