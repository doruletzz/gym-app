import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { loadToken, login, setError } from "../../features/auth/slice";

import ErrorPopup from "../../components/ErrorPopup";

type UserFormState = {
  username: string;
  password: string;
  isPasswordVisible: boolean;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: 960,
  margin: "0 auto",
  marginTop: 96,
  minHeight: 240,
}));

export const LoginForm = () => {
  const { isFetching, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [values, setValues] = useState<UserFormState>({
    username: "",
    password: "",
    isPasswordVisible: false,
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange =
    (key: keyof UserFormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: e.target.value });
    };

  const handleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    setValues({ ...values, isPasswordVisible: !values.isPasswordVisible });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(values);

    dispatch(login(values.username, values.password));
  };

  useEffect(() => {
    if (error.message) {
      setIsSnackbarOpen(true);
      setSnackbarMessage(error.message);
      dispatch(setError({ message: "" }));
    }
  }, [error]);

  if (isFetching) return <CircularProgress />;

  // if (error.message) setIsSnackbarOpen(true);

  return (
    <>
      <ErrorPopup
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        message={snackbarMessage}
      />
      <StyledPaper>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          justifyContent="space-between"
          sx={{ minHeight: "inherit" }}
        >
          <Box>
            <Typography variant="h4" mb={2}>
              Login
            </Typography>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  label="username"
                  id="username"
                  required
                  value={values.username}
                  onChange={handleChange("username")}
                  variant="standard"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="password" required>
                  password
                </InputLabel>
                <Input
                  id="password"
                  type={!values.isPasswordVisible ? "password" : "text"}
                  value={values.password}
                  required
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {values.isPasswordVisible ? "✖️" : "👀"}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
          </Box>

          <ButtonGroup
            sx={{
              justifyContent: "space-between",
              display: "flex",
              direction: { xs: "row", md: "col" },
            }}
          >
            <Button component={Link} to="/register" variant="outlined">
              Don't have an account
            </Button>

            <Button type="submit" variant="contained">
              Login
            </Button>
          </ButtonGroup>
        </Stack>
      </StyledPaper>
    </>
  );
};
