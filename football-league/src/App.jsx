import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage';
import StandingsTable from "./components/StandingsTable/StandingsTable.jsx";
import Leagues from "./components/Leagues/Leagues.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/standings" element={<StandingsTable />} />
                <Route path="/leagues" element={<Leagues />} />
            </Routes>
        </Router>
    );
}

export default App;
