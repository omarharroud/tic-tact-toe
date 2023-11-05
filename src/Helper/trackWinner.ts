import { toast } from "react-toastify";
import Socket from "../Socket";

export type Board = {
  target_Track: string;
  board_Count: number[];
  current_Player_Mark: string | null;
};

export const track = (Data: Board) => {
  const { target_Track, board_Count, current_Player_Mark } = Data;

  if (!board_Count || !current_Player_Mark) return;

  if (
    board_Count.includes(1) &&
    board_Count.includes(2) &&
    board_Count.includes(3)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(1) &&
    board_Count.includes(4) &&
    board_Count.includes(7)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(1) &&
    board_Count.includes(5) &&
    board_Count.includes(9)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(4) &&
    board_Count.includes(5) &&
    board_Count.includes(6)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(3) &&
    board_Count.includes(6) &&
    board_Count.includes(9)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(2) &&
    board_Count.includes(5) &&
    board_Count.includes(8)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(7) &&
    board_Count.includes(8) &&
    board_Count.includes(9)
  ) {
    if (target_Track === sessionStorage.getItem("player_Mark")) {
      // e won
      Socket.emit("winner", {
        game_ID: sessionStorage.getItem("game_ID"),
        winner: {
          player_ID: sessionStorage.getItem("player_ID"),
          player_Mark: sessionStorage.getItem("player_Mark"),
        },
      });
    }
  } else if (
    board_Count.includes(3) &&
    board_Count.includes(5) &&
    board_Count.includes(7)
  ) {
    // X won
    Socket.emit("winner", {
      game_ID: sessionStorage.getItem("game_ID"),
      winner: {
        player_ID: sessionStorage.getItem("player_ID"),
        player_Mark: sessionStorage.getItem("player_Mark"),
      },
    });
  }
};
