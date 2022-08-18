import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
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
import { loadToken, login } from "../../features/auth/slice";

type UserFormState = {
  username: string;
  password: string;
  isPasswordVisible: boolean;
};

export const LoginForm = () => {
  const { token, isFetching, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [values, setValues] = useState<UserFormState>({
    username: "",
    password: "",
    isPasswordVisible: false,
  });

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

  if (token) return <Navigate to="/plan" />;

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        width: "48rem",
        height: "24rem",
        mx: "auto",
        p: 6,
      }}
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

        <Button type="submit" variant="contained" sx={{ float: "right" }}>
          Login
        </Button>
        <Button component={Link} to="/register">
          Don't have an account
        </Button>
      </Box>
    </Paper>
  );
};
