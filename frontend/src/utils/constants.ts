export const IS_PROD = import.meta.env.PROD;

export const API_URL = IS_PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:4000";

export const API_ROUTE_LOGIN = "/users/login";

export const API_ROUTE_USER = "/users";

export const API_ROUTE_REGISTER = "/users/register";

export const API_ROUTE_WORKOUT_PLAN = "/plans/workout";

export const API_ROUTE_NUTRITION_PLAN = "/plans/nutrition";

export const API_ROUTE_PLAN = "/plans";

export const ROUTE_LOGIN = "login";

export const ROUTE_REGISTER = "register";

export const ROUTE_PLAN = "plan";

export const ROUTE_PLANS = "plans";
export const ROUTE_PLANS_ADD = "plans/add";
export const ROUTE_NUTRITION_ADD = "nutrition/add";
export const ROUTE_WORKOUT_ADD = "workout/add";

export const ROUTE_PROFILE = "profile";

export const ROUTE_LOGOUT = "logout";

export const ROUTE_NUTRITION = "nutrition";

export const ROUTE_WORKOUT = "workout";

export const ROUTE_HOME = "/";
