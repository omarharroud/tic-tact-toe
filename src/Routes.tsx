import React, { FC } from "react";
import { useRoutes } from "react-router-dom";
import TicTac from "./TicTac";
import Page404 from "./Page404";
import Game from "./Game";

const Routes: FC<{}> = ({}) => {
  const myRoutes = useRoutes([
    {
      path: "/",
      element: <Game />,
    },
    {
      path: "/tic-tac/:id/",
      element: <TicTac />,
    },
    {
      path: "/*",
      element: <Page404 />,
    },
  ]);
  return myRoutes;
};

export default Routes;
