import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import history from "./services/history";
import Routes from "./routes";

import GlobalStyle from "./styles/global";
export default function src() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={4000} />
    </Router>
  );
}
