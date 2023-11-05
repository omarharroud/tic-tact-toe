import React, { FC, useState, useCallback, useEffect } from "react";
import Socket from "./Socket";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialState } from "./TicTacConfig";
import { ticTacBoard } from "./TicTacConfig";
import { v4 } from "uuid";
import { track, Board } from "./Helper/trackWinner";

const TicTac: FC<{}> = ({}) => {
  // URL params
  const { id } = useParams();

  const [freeze, setFreeze] = useState<string>("");

  // Game data
  const [gameTrack, setGameTrack] = useState<ticTacBoard[]>(initialState);

  // Game status
  const [gameStatus, setGameStatus] = useState("TIE");

  useEffect(() => {
    // listen on game creation
    Socket.on("new-game", (data) => {
      const { error, msg, player_ID, player_Mark, game_ID, err } = data;
      if (sessionStorage.getItem("player_ID" || err)) {
        toast(err);
        return;
      }
      if (msg && player_ID && player_Mark && game_ID) {
        // First player has joined
        toast(msg);

        // save connected player infos
        sessionStorage.setItem("player_ID", player_ID);
        sessionStorage.setItem("player_Mark", player_Mark);
        sessionStorage.setItem("game_ID", game_ID);
      }
    });

    const createGame = () => {
      if (
        sessionStorage.getItem("player_ID") &&
        sessionStorage.getItem("player_Mark") &&
        sessionStorage.getItem("game_ID")
      ) {
        // Join game back only
        Socket.emit("new-game", {
          player_ID: v4().slice(1, 8),
          gameID: id,
          rejoin: true,
        });
        return;
      }

      // Create Game
      Socket.emit("new-game", {
        player_ID: v4().slice(1, 8),
        gameID: id,
      });
    };
    createGame();

    // Move actions
    Socket.on("move", (data) => {
      const { player_ID, game_ID, ref, value } = data;

      let moveSucces = false;

      if (player_ID && game_ID && ref && value) {
        gameTrack.forEach((e, index) => {
          if (e.reference === Number(ref) && e.value === "") {
            e.value = value;
            moveSucces = true;
          }
        });
        if (moveSucces) {
          setGameTrack([...gameTrack]); // Update Board moves

          setFreeze(player_ID); // freez the Player from the next move
        }
      }
    });

    // Socket.emit("move", {
    //   player_ID: null,
    //   game_ID: id,
    //   ref: null,
    //   value: null,
    // });

    // WINNER EVENT
    Socket.on("winner", ({ game_ID, game_Winner }) => {
      if (game_Winner && game_Winner === sessionStorage.getItem("player_ID")) {
        toast("you won");
      } else if (
        game_Winner &&
        game_Winner !== sessionStorage.getItem("player_ID")
      ) {
        toast("you lost");
      }
      setGameStatus("NO-TIE");
      sessionStorage.removeItem("player_ID");
      sessionStorage.removeItem("game_ID");
      sessionStorage.removeItem("player_Mark");
    });
  }, []);

  // DRAW EVENT
  Socket.on("draw", (data) => {
    const { msg } = data;
    toast(msg);
  });

  const play = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //
    const { reference } = e.currentTarget.dataset;

    if (freeze === sessionStorage.getItem("player_ID")) {
      console.log("wait for your turn");
      toast("not your turn");
      return;
    }

    const player_ID_storage = sessionStorage.getItem("player_ID");
    const player_Mark_storage = sessionStorage.getItem("player_Mark");
    const player_gameID_storage = sessionStorage.getItem("game_ID");

    Socket.emit("move", {
      player_ID: player_ID_storage,
      game_ID: player_gameID_storage,
      ref: reference,
      value: player_Mark_storage,
      drawCheck: gameTrack.filter((e) => e.value !== ""),
    });
  };

  // Track winner
  const trackGame = useCallback(async () => {
    // Track Board count
    const X = gameTrack
      .filter((e, index) => e.value === sessionStorage.getItem("player_Mark"))
      .map((e) => e.reference);

    await track({
      target_Track: sessionStorage.getItem("player_Mark") as string,
      board_Count: X,
      current_Player_Mark: sessionStorage.getItem("player_Mark")
        ? sessionStorage.getItem("player_Mark")
        : null,
    });

    // Check for draw
    // const draw = gameTrack.filter((e, index) => e.value !== "").length;

    // if (draw === 9 && gameStatus === "TIE") {
    //   Socket.emit("draw", {
    //     gameID: sessionStorage.getItem("game_ID"),
    //   });

    //   sessionStorage.clear();
    // }
  }, [gameTrack]);

  trackGame();
  return (
    <>
      {sessionStorage.getItem("player_ID") &&
        sessionStorage.getItem("player_Mark") && (
          <div>
            <div>
              <p>your ID is: {sessionStorage.getItem("player_ID")}</p>
            </div>
            <div>
              <p>your Mark: {sessionStorage.getItem("player_Mark")}</p>
            </div>
          </div>
        )}
      <ToastContainer />
      <div className="tic-tac-container">
        {gameTrack.map(({ reference, value }, index) => (
          <div
            key={index}
            onClick={play}
            data-reference={reference}
            data-val={value}
          >
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export default TicTac;
