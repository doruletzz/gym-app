export const IS_PROD = import.meta.env.PROD;

export const API_URL = IS_PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:4000";

export const API_ROUTE_LOGIN = "/user/login";

export const API_ROUTE_USER = "/user";

export const API_ROUTE_REGISTER = "/user/register";

export const API_ROUTE_WORKOUT_PLAN = "/plan/workout";

export const API_ROUTE_NUTRITION_PLAN = "/plan/nutrition";

export const API_ROUTE_PLAN = "/plan";

export const ROUTE_LOGIN = "login";

export const ROUTE_REGISTER = "register";

export const ROUTE_PLAN = "plan";

export const ROUTE_PROFILE = "profile";

export const ROUTE_LOGOUT = "logout";

export const ROUTE_NUTRITION = "nutrition";

export const ROUTE_WORKOUT = "workout";

export const ROUTE_HOME = "/";
