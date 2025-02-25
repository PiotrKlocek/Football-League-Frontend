import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage';
import StandingsTable from "./components/StandingsTable/StandingsTable.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/standings" element={<StandingsTable />} />
            </Routes>
        </Router>
    );
}

export default App;
