import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
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
import { loadToken, register } from "../../features/auth/slice";
import { UserData } from "../../types/auth/UserData";

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

  if (token) return <Navigate to="/plan" />;

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return (
    <StyledPaper

    //   sx={{
    //     height: "24rem",
    //     mx: "auto",
    //     p: 6,
    //   }}
    >
      <Box component="form" onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" sx={{ float: "right" }}>
          Register
        </Button>
        <Button component={Link} to="/login">
          Already have an account
        </Button>
      </Box>
    </StyledPaper>
  );
};
