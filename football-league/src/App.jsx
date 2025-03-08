import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage';
import Teams from './components/Teams/Teams.jsx';
import Leagues from "./components/Leagues/Leagues.jsx";
import Referees from "./components/Referees/Referees.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/leagues" element={<Leagues />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/referees" element={<Referees />} />
            </Routes>
        </Router>
    );
}

export default App;
