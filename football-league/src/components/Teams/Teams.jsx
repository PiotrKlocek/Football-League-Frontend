import './Teams.css';
import Navbar from "../Navbar/Navbar.jsx";
import React, { useCallback, useEffect, useState } from "react";


const Teams = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [standings, setStandings] = useState([]);

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [theme, setTheme] = useState("dark");

    const fetchLeagues = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/leagues");
            if (!response.ok) throw new Error(`Błąd pobierania danych: ${response.status}`);

            const data = await response.json();
            setLeagues(data);
            setSelectedLeague(data[0] || null);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);

    const fetchTeams = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/teams");
            if (!response.ok) throw new Error(`Błąd pobierania danych: ${response.status}`);

            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);

    const fetchStandings = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/standing");
            if (!response.ok) throw new Error(`Błąd pobierania danych: ${response.status}`);

            const data = await response.json();
            setStandings(data);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    }, []);

    const fetchPlayers = useCallback(async () => {
        try{
            const response = await fetch("http://localhost:8080/api/player");
            if (!response.ok) throw new Error(`Błąd pobierania danych: ${response.status}`);

            const data = await response.json();
            console.log(players);
            setPlayers(data);
        } catch (error) {
            console.error("Bład pobierania danych:", error);
        }
    },[]);

    useEffect(() => {
        fetchLeagues();
        fetchTeams();
        fetchStandings();
        fetchPlayers();
    }, [fetchLeagues, fetchTeams, fetchStandings,fetchPlayers]);

    useEffect(() => {
        if (selectedLeague) {
            const teamsInLeague = teams.filter(team => team.leagueId === selectedLeague.id);
            if (teamsInLeague.length > 0) {
                setSelectedTeam(teamsInLeague[0]);
            }
        }
    }, [selectedLeague, teams]);

    const selectedLeagueStandings = selectedLeague
        ? standings.filter(standing => standing.league.id === selectedLeague.id)
        : [];

    return (
        <div>
            <Navbar theme={theme} setTheme={setTheme} />
            <div className={`teams-container ${theme}`}>
                <div className={`selectors ${theme}`}>
                    <div className={`league-select ${theme}`}>
                        <label>Wybierz ligę: </label>
                        <select onChange={(e) => {
                            const selected = leagues.find(l => l.name === e.target.value);
                            setSelectedLeague(selected);
                        }}>
                            {leagues.map((league) => (
                                <option key={league.id} value={league.name}>
                                    {league.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={`team-select ${theme}`}>
                        <label>Wybierz drużynę: </label>
                        <select onChange={(e) => {
                            const selected = teams.find(t => t.name === e.target.value);
                            setSelectedTeam(selected);
                        }}>
                            {teams
                                .filter(team => team.leagueId === selectedLeague?.id)
                                .map((team) => (
                                    <option key={team.id} value={team.name}>
                                        {team.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {selectedTeam && (
                        <label className="selected-team-label">
                            <strong>{selectedTeam.name}</strong>
                        </label>
                    )}
                </div>

                <div className="players-table">
                    <table className="league-team-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>PKT</th>
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
                                    className={`${standing.team.id === selectedTeam?.id ? "selected-team-row" : ""} ${positionClass}`}
                                >

                                    <td>
                                        <span className={`position-circle ${positionClass}`}>{position}</span>
                                    </td>
                                    <td>{standing.team.name}</td>
                                    <td>{standing.matchesPlayed}</td>
                                    <td>{standing.wins}</td>
                                    <td>{standing.draws}</td>
                                    <td>{standing.losses}</td>
                                    <td>{standing.points}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Teams;
