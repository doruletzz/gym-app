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

export type DailyWorkoutPlan = {
  day: number;
  exercises: Exercise[];
  details?: string;
};

export type Exercise = {
  name: string;
  duration?: string;
  sets?: number;
  reps?: number;
  details?: string;
};

export type DailyNutritionPlan = {
  day: number;
  breakfast: string | Meal;
  lunch: string | Meal;
  dinner: string | Meal;
  snacks: string | Meal;
  details: string;
};

export type Meal = {
  name: string;
  ingredients: Ingredient[];
  calories: number;
  macros?: MacroNutrients;
  recipeLink?: string;
  details?: string;
};

export type MacroNutrients = {
  proteins: number;
  carbohydrates: number;
  fats: number;
  alcohols: number;
};

export type Ingredient = {
  grams: number;
  name: string;
};

export type NutritionPlan = {
  slug?: string;
  title?: string;
  subtitle?: string;
  from?: Date;
  to?: Date;
  nutritionist?: string;

  plan?: DailyNutritionPlan[];
  isDetailed: boolean;
};

export type WorkoutPlan = {
  slug?: string;
  title?: string;
  subtitle?: string;
  from?: Date;
  to?: Date;
  trainer?: string;
  plan?: DailyWorkoutPlan[];
  isDetailed: boolean;
};

export type FitnessPlan = {
  slug: string;
  nutrition: NutritionPlan;
  workout: WorkoutPlan;
};

export type FetchError = {
  message: string;
};

interface PlanState {
  isFetching: boolean;
  error: FetchError;
  plans: FitnessPlan[];
}

const initialState: PlanState = {
  isFetching: false,
  error: { message: "" },
  plans: [],
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
      return { ...state, plans: [...state.plans, action.payload] };
    },
    setFitnessPlans: (state, action: PayloadAction<FitnessPlan[]>) => {
      return { ...state, plans: action.payload };
    },
    setNutritionPlan: (state, action: PayloadAction<NutritionPlan>) => {
      //   return {
      //     ...state,
      //     plan: {
      //       ...state.plan,
      //       nutrition: {
      //         ...state.plan.nutrition,
      //         ...action.payload,
      //         isDetailed: true,
      //       },
      //     },
      //   };
    },
    setWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      //   return {
      //     ...state,
      //     plan: {
      //       ...state.plan,
      //       workout: {
      //         ...state.plan.workout,
      //         ...action.payload,
      //         isDetailed: true,
      //       },
      //     },
      //   };
    },
  },
});

const {
  setFitnessPlans,
  setIsFetching,
  setNutritionPlan,
  setWorkoutPlan,
  setError,
} = planSlice.actions;

//Actions
export const fetchAllFitnessPlans = (): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_PLAN, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(
          setFitnessPlans(
            data.map((plan) => {
              return {
                slug: plan.slug,
                nutrition: plan.nutritionPlan,
                workout: plan.workoutPlan,
              } as FitnessPlan;
            })
          )
        );
      })
      .catch(({ error }) => {
        dispatch(setError(error));
        console.error(error);
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export const fetchNutritionPlanDetails = (slug: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_NUTRITION_PLAN + "/" + slug, {
        withCredentials: true,
      })
      .then(({ data }) => {
        // // console.log(data);
        dispatch(setNutritionPlan(data));
      })
      .catch(({ error }) => {
        console.error(error);
        dispatch(setError(error));
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
      .get(API_URL + API_ROUTE_WORKOUT_PLAN + "/" + slug, {
        withCredentials: true,
      })
      .then(({ data }) => {
        // // console.log(data);
        dispatch(setWorkoutPlan(data));
      })
      .catch(({ error }) => {
        console.error(error);
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export default planSlice.reducer;
