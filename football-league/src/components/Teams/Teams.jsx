import './Teams.css';
import Navbar from "../Navbar/Navbar.jsx";
import React, { useCallback, useEffect, useState } from "react";
const leagueIcons = {
    "Premier League": "/public/premier-league-logo.png",
    "La Liga": "/public/la-liga-logo.png",
    "Serie A": "/public/serie-a-logo.png",
    "Bundesliga": "/public/bundesliga-logo.png",
    "Ligue 1": "/public/Ligue1-logo.png",
    "Champions League" : "/uefa-champions-league.png",
    "Ekstraklasa" : "/ekstraklasa.png"
};

const playerFlag = {
    "Poland": "/public/Poland.png",
    "Brazil": "/public/Brazil.png",
    "Argentina": "/public/Argentina.png",
    "Germany": "/public/Germany.png",
    "France": "/public/France.png",
    "Italy": "/public/Italy.png",
    "Spain": "/public/Spain.png",
    "England": "/public/England.png",
    "Portugal": "/public/Portugal.png",
    "Netherlands": "/public/Netherlands.png",
    "Belgium": "/public/Belgium.png",
    "Uruguay": "/public/Uruguay.png",
    "Croatia": "/public/Croatia.png",
    "Denmark": "/public/Denmark.png"
}
const Teams = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [standings, setStandings] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [theme, setTheme] = useState("dark");
    const [selectedTeamId, setSelectedTeamId] = useState(() => {
        return localStorage.getItem("selectedTeamId") || null;
    });


    const getTeamEmblem = (teamId) => {
        return `http://localhost:8080/api/teams/${teamId}/emblem`;
    };

    const getPlayerPhoto = (playerId) => {
        return `http://localhost:8080/api/player/${playerId}/photo`;
    };

    const groupedPlayers = {
        Goalkeepers: players.filter(player => player.position === "Goalkeeper"),
        Defenders: players.filter(player => player.position === "Defender"),
        Midfielders: players.filter(player => player.position === "Midfielder"),
        Forwards: players.filter(player => player.position === "Forward")
    }

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

    useEffect(() => {
        if (selectedTeamId) {
            localStorage.setItem("selectedTeamId", selectedTeamId);
        }
    }, [selectedTeamId]);

    useEffect(() => {
        if (selectedTeamId && teams.length > 0) {
            const team = teams.find(t => t.id === parseInt(selectedTeamId));
            setSelectedTeam(team || null);
        }
    }, [selectedTeamId, teams]);

    const handleTeamSelect = (teamId) => {
        setSelectedTeamId(teamId);
    };

    const selectedLeagueStandings = selectedLeague
        ? standings.filter(standing => standing.league.id === selectedLeague.id)
        : [];

    return (
        <div>
            <Navbar theme={theme} setTheme={setTheme} />
            <div className={`teams-container ${theme}`}>
                <div className={`selectors ${theme}`}>
                    <div className={`league-select ${theme}`}>
                        <label>Select league: </label>
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
                        <label>Select team: </label>
                        <select onChange={(e) => {
                            const selected = teams.find(t => t.name === e.target.value);
                            if (selected) {
                                setSelectedTeam(selected);
                                setSelectedTeamId(selected.id);
                            }
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
                        <div className="teams-info">
                            <label className="team-label">
                                <img
                                    src={getTeamEmblem(selectedTeam.id)}
                                    alt={`${selectedTeam.name} emblem`}
                                    className="team-emblem1"
                                />
                                <strong>{selectedTeam.name}</strong>
                            </label>
                            <label className="league-name-info">
                                <img src={leagueIcons[selectedLeague.name]} alt={selectedLeague.name}
                                     className="league-logo"/>
                                <strong>{selectedLeague.name}</strong>
                            </label>

                        </div>
                    )}
                </div>

                <div className={`players-table ${theme}`}>
                    <table className={`league-team-table ${theme}`}>
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
                                    onClick={() => handleTeamSelect(standing.team.id)}
                                    className={standing.team.id === Number(selectedTeamId) ? "selected-team-row" : ""}
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
                                    <td>{standing.points}</td>
                                </tr>
                            );
                        })}
                        </tbody>

                    </table>
                    <div className={`players-container ${theme}`}>
                        <div className={`players ${theme}`}><strong>Players</strong></div>
                        {Object.entries(groupedPlayers).map(([position, players]) => (
                            <div key={position} className="players-group">
                                <h3 className="position">{position}</h3>
                                <div className="players-grid">
                                    {players.filter(player => player.team.id === selectedTeam.id)
                                        .map(player => (
                                            <div key={player.id} className="player-tile">
                                                <div className="player-info">
                                                    <div className="player-photo-wrapper">
                                                        <img
                                                            src={getPlayerPhoto(player.id)}
                                                            alt={`${player.name} emblem`}
                                                            className="player-photo"
                                                        />
                                                        <div className="player-number">{player.number}</div>
                                                    </div>
                                                    <p><strong>{player.name}</strong></p>
                                                    <div className="flag-container">
                                                        <img
                                                            src={playerFlag[player.nationality]}
                                                            alt={player.nationality}
                                                            className="player-flag"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Teams;
