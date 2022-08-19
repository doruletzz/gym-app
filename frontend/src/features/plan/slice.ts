import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios/axios";
import { FitnessPlanState } from "../../pages/Register/RegisterForm";
import {
  API_ROUTE_NUTRITION_PLAN,
  API_ROUTE_PLAN,
  API_ROUTE_WORKOUT_PLAN,
  API_URL,
} from "../../utils/constants";
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
  isFetching: boolean;
  error: FetchError;
  plan: FitnessPlan;
}

const initialState: PlanState = {
  isFetching: false,
  error: { message: "" },
  plan: { nutrition: {}, workout: {} },
};

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
      return { ...state, plan: { ...state.plan, ...action.payload } };
    },
    setNutritionPlan: (state, action: PayloadAction<NutritionPlan>) => {
      return {
        ...state,
        plan: {
          ...state.plan,
          nutrition: { ...state.plan.nutrition, ...action.payload },
        },
      };
    },
    setWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      return {
        ...state,
        plan: {
          ...state.plan,
          workout: { ...state.plan.workout, ...action.payload },
        },
      };
    },
  },
});

export const {
  setFitnessPlan,
  setIsFetching,
  setNutritionPlan,
  setWorkoutPlan,
  setError,
} = planSlice.actions;

//Actions
export const fetchFitnessPlanDisplay = (): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_PLAN, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(setFitnessPlan(data));
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

export const fetchNutritionPlanDetails = (slug: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_NUTRITION_PLAN + "/" + slug)
      .then((data) => {
        console.log(data);
        dispatch(setNutritionPlan(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export const fetchWorkoutPlanDetails = (slug: string): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_WORKOUT_PLAN + "/" + slug)
      .then((data) => {
        console.log(data);
        dispatch(setWorkoutPlan(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export default planSlice.reducer;
