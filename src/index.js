import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrUserProvider } from "./contexts/CurrUserContext";
import { AccountDataProvider } from "./contexts/AccountDataContext";

ReactDOM.render(
  <Router>
    <CurrUserProvider>
      <AccountDataProvider>
        <App />
      </AccountDataProvider>
    </CurrUserProvider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
