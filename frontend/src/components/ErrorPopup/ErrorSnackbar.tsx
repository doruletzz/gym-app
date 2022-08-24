import { Alert, Snackbar } from "@mui/material";
import React from "react";

export const ErrorSnackbar = ({ isOpen, setIsOpen, message }) => {
  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Snackbar open={isOpen}>
      <Alert onClose={handleCloseSnackbar} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};
