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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import { WorkoutPlan } from "../../features/plan/slice";

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

const SHOW_PASSWORD_ICON_SRC = "/show-icon.svg";
const HIDE_PASSWORD_ICON_SRC = "/hide-icon.svg";

const SHOW_PASSWORD_ICON = (
  <Box component="img" src={SHOW_PASSWORD_ICON_SRC} alt="show" />
);

const HIDE_PASSWORD_ICON = (
  <Box component="img" src={HIDE_PASSWORD_ICON_SRC} alt="hide" />
);

export const WorkoutAddForm = () => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<WorkoutPlan>({
    slug: "",
    title: "",
    subtitle: "",
    from: new Date(),
    to: new Date(),
    trainer: "",
    plan: [],
    isDetailed: true,
  });

  const handleChange =
    (key: keyof WorkoutPlan) => (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: e.target.value });
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dispatch(register(values));
    console.log(values);
  };

  return (
    <>
      <StyledPaper>
        <Stack component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" mb={2}>
            Register
          </Typography>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="slug"
                id="slug"
                required
                value={values.slug}
                onChange={handleChange("slug")}
                variant="standard"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="title"
                id="title"
                required
                value={values.title}
                onChange={handleChange("title")}
                variant="standard"
              />
            </FormControl>
          </Stack>
          {/* <Stack direction="row" justifyContent="space-between" spacing={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="from"
                required
                value={values.from}
                onChange={(newValue) => {
                  setValues({values.from: newValue});
                }}
                variant="standard"
              />
            </LocalizationProvider>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="title"
                id="title"
                required
                value={values.title}
                onChange={handleChange("title")}
                variant="standard"
              />
            </FormControl>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="subtitle"
                id="subtitle"
                required
                value={values.subtitle}
                onChange={handleChange("subtitle")}
                variant="standard"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="title"
                id="title"
                required
                value={values.title}
                onChange={handleChange("title")}
                variant="standard"
              />
            </FormControl>
          </Stack> */}

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
