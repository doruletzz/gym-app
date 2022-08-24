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
  MenuItem,
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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { loadToken, register, setError } from "../../features/auth/slice";
import { UserData } from "../../types/auth/UserData";
import ErrorPopup from "../../components/ErrorPopup";

const genders = [
  {
    val: "M",
    label: "Male",
  },
  {
    val: "F",
    label: "Female",
  },
  {
    val: "O",
    label: "Other",
  },
];

const levels = [
  {
    val: "beginner",
    label: "Newbie",
  },
  {
    val: "intermidate",
    label: "Fit",
  },
  {
    val: "advanced",
    label: "Athlete",
  },
];

export type FitnessPlanState = {};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: 960,
  margin: "0 auto",
  marginTop: 72,
  minHeight: 360,
}));

export const RegisterForm = () => {
  const { token, isFetching, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [values, setValues] = useState<UserData>({
    username: "",
    password: "",
    age: -1,
    gender: "M",
    height: -1,
    level: "beginner",
    isPasswordVisible: false,
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // if (reason === "clickaway") {
    //   return;
    // }

    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    if (error.message) {
      setIsSnackbarOpen(true);
      setSnackbarMessage(error.message);
      dispatch(setError({ message: "" }));
    }
  }, [error]);

  const handleChange =
    (key: keyof UserData) => (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: e.target.value });
    };

  const handleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    setValues({ ...values, isPasswordVisible: !values.isPasswordVisible });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(values));
    console.log(values);
  };

  if (isFetching) return <CircularProgress />;

  return (
    <>
      <ErrorPopup
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        message={snackbarMessage}
      />
      <StyledPaper>
        <Stack component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" mb={2}>
            Register
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

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            mb={4}
          >
            <FormControl fullWidth>
              {/* <InputLabel htmlFor="age">age</InputLabel> */}
              <TextField
                label="age"
                id="age"
                required
                value={values.age > 0 ? values.age : ""}
                type="number"
                onChange={handleChange("age")}
                variant="standard"
              />
            </FormControl>

            <FormControl fullWidth>
              {/* <InputLabel htmlFor="name">name</InputLabel> */}
              <TextField
                label="gender"
                select
                required
                id="gender"
                value={values.gender}
                onChange={handleChange("gender")}
                variant="standard"
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.val} value={gender.val}>
                    {gender.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            mb={4}
          >
            <FormControl fullWidth>
              <TextField
                label="height"
                required
                id="height"
                value={values.height > 0 ? values.height : ""}
                type="number"
                onChange={handleChange("height")}
                variant="standard"
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="level"
                required
                select
                id="level"
                value={values.level}
                onChange={handleChange("level")}
                variant="standard"
              >
                {levels.map((level) => (
                  <MenuItem key={level.val} value={level.val}>
                    {level.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Stack>
          <ButtonGroup sx={{ justifyContent: "space-between" }}>
            <Button component={Link} to="/login" variant="outlined">
              Already have an account
            </Button>
            <Button type="submit" variant="contained" sx={{ float: "right" }}>
              Register
            </Button>
          </ButtonGroup>
        </Stack>
      </StyledPaper>
    </>
  );
};
