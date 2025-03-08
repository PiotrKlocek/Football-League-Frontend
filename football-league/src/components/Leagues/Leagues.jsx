import React, { useState, useEffect, useCallback } from "react";
import "./Leagues.css";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";

const leagueIcons = {
    "Premier League": "/public/premier-league-logo.png",
    "La Liga": "/public/la-liga-logo.png",
    "Serie A": "/public/serie-a-logo.png",
    "Bundesliga": "/public/bundesliga-logo.png",
    "Ligue 1": "/public/Ligue1-logo.png",
    "Champions League": "/public/uefa-champions-league.png",
    "Ekstraklasa": "/public/ekstraklasa.png"
};

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);
    const [standings, setStandings] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [theme, setTheme] = useState("dark");

    const getTeamEmblem = (teamId) => {
        return `http://localhost:8080/api/teams/${teamId}/emblem`;
    };

    const navigate = useNavigate();

    const handleTeamClick = (team) => {
        navigate("/teams");
        localStorage.setItem("selectedTeamId", team.id);
    };

    const fetchLeagues = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/leagues");
            if (!response.ok) {
                throw new Error(`Błąd pobierania danych: ${response.status}`);
            }
            const data = await response.json();
            setLeagues(data);
            setSelectedLeague(data[0]);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);

    const fetchStandings = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/standing");
            if (!response.ok) {
                throw new Error(`Błąd pobierania danych: ${response.status}`);
            }
            const data = await response.json();
            setStandings(data);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);

    useEffect(() => {
        fetchLeagues();
        fetchStandings();
    }, [fetchLeagues, fetchStandings]);

    const selectedLeagueStandings = selectedLeague
        ? standings.filter(standing => standing.league.id === selectedLeague.id)
        : [];

    return (
        <div>
            <Navbar theme={theme} setTheme={setTheme} />
            <div className={`league-container ${theme}`}>
                <div className="league-selector">
                    <label>Wybierz ligę: </label>
                    <select onChange={(e) => setSelectedLeague(leagues.find(l => l.name === e.target.value))}>
                        {leagues.map((league) => (
                            <option key={league.id} value={league.name}>
                                {league.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedLeague && (
                    <div className={`league-table ${theme}`}>
                        <h2>
                            <img src={leagueIcons[selectedLeague.name]} alt={selectedLeague.name} className="league-icon" />
                            {selectedLeague.name}
                        </h2>
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>M</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>Goals</th>
                                <th>PTS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedLeagueStandings.sort((a, b) => b.points - a.points).map((standing, index) => {

                                const position = index + 1;
                                let positionClass = "";

                                if (position <= 3) {
                                    positionClass = "top-three";
                                } else if (position === 4) {
                                    positionClass = "fourth-place";
                                } else if (position >= selectedLeagueStandings.length - 2) {
                                    positionClass = "bottom-three";
                                } else {
                                    positionClass = "other-place";
                                }

                                return (
                                    <tr
                                        key={standing.id}
                                        onClick={() => handleTeamClick(standing.team)}
                                    >
                                        <td>
                                            <span className={`position-circle ${positionClass}`}>{position}</span>
                                        </td>

                                        <td>
                                            <div className="team-name-emblem">
                                                <img
                                                    src={getTeamEmblem(standing.team.id)}
                                                    alt={`${standing.team.name} emblem`}
                                                    className="team-emblem"
                                                />
                                                {standing.team.name}
                                            </div>
                                        </td>

                                        <td>{standing.matchesPlayed}</td>
                                        <td>{standing.wins}</td>
                                        <td>{standing.draws}</td>
                                        <td>{standing.losses}</td>
                                        <td>{standing.goalsScored}:{standing.goalsConceded}</td>
                                        <td>{standing.points}</td>
                                    </tr>
                                );
                            })}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leagues;