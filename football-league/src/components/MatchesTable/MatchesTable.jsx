import { useEffect, useState } from "react";
import "./MatchesTable.css";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
const leagueIcons = {
    "Premier League": "/public/premier-league-logo.png",
    "La Liga": "/public/la-liga-logo.png",
    "Serie A": "/public/serie-a-logo.png",
    "Bundesliga": "/public/bundesliga-logo.png",
    "Ligue 1": "/public/Ligue1-logo.png",
    "Champions League" : "/uefa-champions-league.png",
    "Ekstraklasa" : "/ekstraklasa.png"
};

const MatchesTable = ({ theme }) => {
    const [matches, setMatches] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 4;

    useEffect(() => {
        fetch("http://localhost:8080/api/match")
            .then((response) => response.json())
            .then((data) => {
                setMatches(data);
                console.log(data);
            })
            .catch((error) => console.error("Błąd podczas pobierania danych:", error));
    }, []);

    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(matches.length / matchesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getTeamEmblem = (teamId) => {
        return `http://localhost:8080/api/teams/${teamId}/emblem`;
    };

    return (
        <div className={`main-container ${theme}`}>
            <div className={`matches-container ${theme}`}>
                {currentMatches.map((match) => (
                    <div key={match.id} className={`match ${theme}`}>
                        <div className="league">
                            <img
                                src={leagueIcons[match.league.name]}
                                alt={match.league.name}
                                className="league-icon"
                            />
                            <span className="league-name">{match.league.name}</span>
                        </div>
                        <div className="team-container">
                            <div className="team-info left">
                                <img
                                    src={getTeamEmblem(match.team1.id)}
                                    alt={`${match.team1.name} emblem`}
                                    className="team-logo"
                                />
                                <span className="team-name">{match.team1.name}</span>
                            </div>

                            <span className="score">{match.team1Score} - {match.team2Score}</span>

                            <div className="team-info right">
                                <img
                                    src={getTeamEmblem(match.team2.id)}
                                    alt={`${match.team2.name} emblem`}
                                    className="team-logo"
                                />
                                <span className="team-name">{match.team2.name}</span>
                            </div>
                        </div>

                        <div className="match-details">
                            <p><strong>Referee:</strong> {match.referee.firstName + " " + match.referee.lastName} </p>
                            <p><strong>Pitch:</strong> {match.pitch.name}</p>
                        </div>

                        <div className={`match-date ${theme}`}>
                            <strong>Data:</strong> {new Date(match.matchDate).toLocaleString()}
                        </div>

                        <hr />
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button className="pagination-btn" onClick={handlePrevPage}>
                    <GrFormPreviousLink />
                </button>

                <button className="pagination-btn" onClick={handleNextPage}>
                    <GrFormNextLink />
                </button>
            </div>
        </div>
    );
};

export default MatchesTable;
