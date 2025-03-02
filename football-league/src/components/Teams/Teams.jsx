import './Teams.css';
import Navbar from "../Navbar/Navbar.jsx";
import React, { useCallback, useEffect, useState } from "react";

const Teams = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [teams, setTeams] = useState([]);
    const [standings, setStandings] = useState(null);
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

    useEffect(() => {
        fetchLeagues();
        fetchTeams();
        fetchStandings();
    }, [fetchLeagues, fetchTeams, fetchStandings]);

    useEffect(() => {
        if (selectedLeague) {
            const teamsInLeague = teams.filter(team => team.leagueId === selectedLeague.id);
            if (teamsInLeague.length > 0) {
                setSelectedTeam(teamsInLeague[0]);
            }
        }
    }, [selectedLeague, teams]);

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
            </div>
        </div>
    );
};

export default Teams;
