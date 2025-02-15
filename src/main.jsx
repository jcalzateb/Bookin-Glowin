import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { Context  } from "./Context/ProductoContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import tema from "./Styles/tema";
import GlobalStyles from "./Styles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Context >
      <GlobalStyles />
      <App />
      </Context >
    </ThemeProvider>
  </React.StrictMode>
)
