import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios/axios";
import { UserData } from "../../types/auth/UserData";
import {
  API_ROUTE_LOGIN,
  API_ROUTE_REGISTER,
  API_ROUTE_USER,
  API_URL,
} from "../../utils/constants";
import {
  getTokenFromCookie,
  removeTokenFromCookie,
  setTokenToCookie,
} from "../../utils/helpers";
import { AppThunk } from "../app/store";
import { FetchError } from "../plan/slice";

type AuthState = {
  isFetching: boolean;
  error: FetchError;
  token: string;
  role: "admin" | "developer" | "member";
};

const initialState: AuthState = {
  token: "",
  isFetching: false,
  error: { message: "" },
  role: "member",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      return { ...state, isFetching: action.payload };
    },
    setError: (state, action: PayloadAction<FetchError>) => {
      removeTokenFromCookie();
      return { ...state, error: action.payload };
    },
    loadToken: (state) => {
      const token = getTokenFromCookie();

      // // console.log(token);

      return { ...state, token };
    },
    setToken: (state, action: PayloadAction<string>) => {
      // const deepCopy: string = JSON.parse(JSON.stringify(action.payload));
      // // console.log(deepCopy);
      setTokenToCookie(action.payload);
      return { ...state, token: action.payload };
    },
    removeToken: (state) => {
      removeTokenFromCookie();
      return { ...state, token: "" };
    },
    setRole: (
      state,
      action: PayloadAction<"admin" | "member" | "developer">
    ) => {
      console.log(state);
      return { ...state, role: action.payload };
    },
  },
});

export const {
  setIsFetching,
  setError,
  setToken,
  removeToken,
  loadToken,
  setRole,
} = authSlice.actions;

export const fetchRole = (): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .get(API_URL + API_ROUTE_USER + "/role")
      .then(({ data }) => {
        console.log(data);
        const { role } = data;
        dispatch(setRole(role ?? "memeber"));
      })
      .catch((error) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export const login = (username: string, password: string): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .post(API_URL + API_ROUTE_LOGIN, { username, password })
      .then(({ data }) => {
        const { token } = data;
        // console.log(token);
        dispatch(setToken(token));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setError(error.response.data));
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export const register = (data: UserData): AppThunk => {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    axios
      .post(API_URL + API_ROUTE_REGISTER, data)
      .then(({ data }) => {
        const { token } = data;
        // // console.log(token);
        dispatch(setToken(token));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setError(error.response.data));
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export default authSlice.reducer;
