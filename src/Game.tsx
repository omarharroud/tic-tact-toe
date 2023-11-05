import React, { FC } from "react";
import { v4 } from "uuid";
import Socket from "./Socket";
import { useNavigate } from "react-router-dom";

const Game: FC<{}> = ({}) => {
  const navigate = useNavigate();

  const newGame = () => {
    const gameID = v4();
    if (!gameID) throw new Error("Couldn't generate ID");

    Socket.emit("new-game", {
      newGameId: gameID,
    });
    // Redirect to game space
    navigate(`/tic-tac/${gameID}`);
  };

  return <button onClick={newGame}>New Game</button>;
};
export default Game;
