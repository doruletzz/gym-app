import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios/axios";
import { FitnessPlanState } from "../../pages/Register/RegisterForm";
import { API_ROUTE_PLAN, API_URL } from "../../utils/constants";
import { AppThunk } from "../app/store";
import { login } from "../auth/slice";

type NutritionPlan = {};

type WorkoutPlan = {};

type FitnessPlan = {
  nutrition: NutritionPlan;
  workout: WorkoutPlan;
};

export type FetchError = {
  message: string;
};

interface PlanState {
  input?: FitnessPlanState;
  isFetching?: boolean;
  error?: FetchError;
  plan?: FitnessPlan;
}

const initialState: PlanState = {};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      return { ...state, isFetching: action.payload };
    },
    setError: (state, action: PayloadAction<FetchError>) => {
      return { ...state, error: action.payload };
    },
    setFitnessPlan: (state, action: PayloadAction<FitnessPlan>) => {
      //TODO: ADD deep copy?
      return { ...state, plan: action.payload };
    },
    setFitnessInput: (state, action: PayloadAction<FitnessPlanState>) => {
      return { ...state, input: action.payload };
    },
  },
});

export const { setFitnessPlan, setFitnessInput, setIsFetching, setError } =
  planSlice.actions;

//Actions
export const fetchFitnessPlan = (token: string): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_PLAN)
      .then(({ data }) => {
        dispatch(setFitnessPlan(data));
        console.log(data);
      })
      .catch((error) => {
        dispatch(setFitnessPlan(error));
        console.error(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
};

export default planSlice.reducer;
