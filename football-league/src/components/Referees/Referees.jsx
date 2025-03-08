import './Referees.css';
import Navbar from "../Navbar/Navbar.jsx";
import React, { useCallback, useEffect, useState } from "react";

const Referees = () => {
    const [referees, setReferees] = useState([]);
    const [theme, setTheme] = useState("dark");
    const [matchesCount, setMatchesCount] = useState({});

    const getRefereePhoto = (refereeId) => {
        return `http://localhost:8080/api/referees/${refereeId}/photo`;
    };

    const getRefereeMatchesCount = async (refereeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/referees/${refereeId}/matches`);
            if (!response.ok) {
                throw new Error('Błąd pobierania liczby meczów');
            }
            const data = await response.json();
            return data || 'Unknown';
        } catch (error) {
            console.error('Błąd pobierania liczby meczów:', error);
            return 'Unknown';
        }
    };

    const fetchReferees = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/referees");
            if (!response.ok) throw new Error(`Błąd pobierania danych: ${response.status}`);
            const data = await response.json();
            setReferees(data);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);

    const fetchMatchesCounts = useCallback(async () => {
        const counts = {};
        for (const referee of referees) {
            counts[referee.id] = await getRefereeMatchesCount(referee.id);
        }
        setMatchesCount(counts);
    }, [referees]);

    useEffect(() => {
        fetchReferees();
    }, [fetchReferees]);

    useEffect(() => {
        if (referees.length > 0) {
            fetchMatchesCounts();
        }
    }, [referees, fetchMatchesCounts]);

    return (
        <div className={`referees-container ${theme}`}>
            <Navbar theme={theme} setTheme={setTheme} />
            <div className="referees-list">
                {referees.map((referee) => (
                    <div key={referee.id} className="referee-card">
                        <img src={getRefereePhoto(referee.id)} alt={`${referee.first_name} ${referee.last_name} photo`} className="referee-photo" />
                        <div className="referee-info">
                            <h3>{referee.firstName + " " + referee.lastName}</h3>
                            <p><strong>Matches:</strong> {matchesCount[referee.id] || 'Loading...'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Referees;
