import { CssBaseline } from "@mui/material";
import { amber, blueGrey, grey, indigo, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { palette } from "@mui/system";

import { alpha } from "@mui/material";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { store } from "./features/app/store";
import "./index.css";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 84,
    },
    subtitle1: {
      fontSize: 16,
      color: blueGrey[600],
    },
  },

  palette: {
    background: {
      default: blueGrey[50],
    },
    text: {
      primary: blueGrey[800],
      secondary: blueGrey[600],
    },
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: amber[600],
    },
  },
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          marginTop: 48,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 100,
          padding: "8px 24px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(4px)",
          backgroundColor: alpha(blueGrey[50], 0.4),
          color: blueGrey[800],
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
