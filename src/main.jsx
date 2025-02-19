import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import tema from "./Styles/tema";
import GlobalStyles from "./Styles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MuiThemeProvider theme={tema}>
      <StyledThemeProvider theme={tema}>
        <CssBaseline />
        <GlobalStyles />
        <App />
      </StyledThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);