import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AppTheme } from "./app/providers/theme";
import "./app/styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppTheme>
      <App />
    </AppTheme>
  </React.StrictMode>,
);
