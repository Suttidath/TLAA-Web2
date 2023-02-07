import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { createBrowserHistory } from "history";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const root = ReactDOM.createRoot(document.getElementById("root"));
let theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans Thai"].join(","),
  },
  responsiveFontSizes: true,
  palette: {
    fontSize: "small",
  },
});
theme = responsiveFontSizes(theme);
export const browserHistory = createBrowserHistory();
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <ThemeProvider theme={theme}>
    <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
      </LocalizationProvider>
    </React.StrictMode>
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
