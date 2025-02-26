import React, { useState, useEffect, useCallback } from "react";
import "./Leagues.css";

const leagueIcons = {
    "Premier League": "/public/premier-league-logo.png",
    "La Liga": "/public/la-liga-logo.png",
    "Serie A": "/public/serie-a-logo.png",
    "Bundesliga": "/public/bundesliga-logo.png",
    "Ligue 1": "/public/Ligue1-logo.png",
    "Champions League" : "/uefa-champions-league.png",
    "Ekstraklasa" : "/ekstraklasa.png"
};


const LeagueCard = ({ league, theme }) => {
    const [emblemUrl, setEmblemUrl] = useState(null);

    useEffect(() => {
        setEmblemUrl(leagueIcons[league.name] || "/no-image.png");
    }, [league.name]);



    return (
        <div className={`league-card ${theme}`}>
            <div className="league-content">
                <img
                    src={emblemUrl}
                    alt={league.name}
                    className="league-emblem"
                    onError={(e) => (e.target.src = "/no-image.png")}
                />
                <div className="league-details">
                    <h2>{league.name}</h2>
                    <p>{league.season || "Brak opisu"}</p>
                </div>
            </div>
        </div>
    );
};

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);

    const fetchLeagues = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/leagues");
            if (!response.ok) {
                throw new Error(`Błąd pobierania danych: ${response.status}`);
            }
            const data = await response.json();
            setLeagues(data);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);



    useEffect(() => {
        fetchLeagues();
    }, [fetchLeagues]);

    return (

        <div className="leagues-container">
            {leagues.map((league) => (
                <LeagueCard key={league.id} league={league} theme="light" />
            ))}
        </div>
    );
};

export default Leagues;