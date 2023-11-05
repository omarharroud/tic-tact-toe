import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes />
  </Router>
);
