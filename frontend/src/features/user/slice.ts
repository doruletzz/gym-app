import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios/axios";
import { UserData } from "../../types/auth/UserData";
import { API_ROUTE_USER } from "../../utils/constants";
import { AppThunk } from "../app/store";
import { setToken } from "../auth/slice";
import { FetchError } from "../plan/slice";

type UserState = {
  isFetching: boolean;
  error: FetchError;
  data: UserData;
};

const initialState: UserState = {
  data: {
    username: "",
    password: "",
    age: -1,
    gender: "M",
    height: -1,
    level: "beginner",
  },
  isFetching: false,
  error: { message: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      console.log("set is fetching", action.payload);
      return { ...state, isFetching: action.payload };
    },
    setError: (state, action: PayloadAction<FetchError>) => {
      return { ...state, error: action.payload };
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      // const deepCopy: string = JSON.parse(JSON.stringify(action.payload));
      // console.log(deepCopy);
      return { ...state, data: action.payload };
    },
  },
});

const { setIsFetching, setError, setUser } = userSlice.actions;

export const updateUserData = (userdata: UserData): AppThunk => {
  return async (dispatch) => {
    console.log("here");
    dispatch(setIsFetching(true));
    axios
      .put(API_ROUTE_USER, userdata, { withCredentials: true })
      .then(({ data }) => {
        const { token } = data;
        console.log(token);
        dispatch(setUser(userdata));
        dispatch(setToken(token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setError(err));
      })
      .finally(() => {
        console.log("setting to false");
        dispatch(setIsFetching(false));
      });
  };
};

export const fetchUserData = (): AppThunk => {
  return async (dispatch) => {
    console.log("here");
    await dispatch(setIsFetching(true));
    axios
      .get(API_ROUTE_USER, { withCredentials: true })

      .then(({ data }) => {
        console.log(data);
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setError(error));
      })
      .finally(() => {
        console.log("setting to false");
        dispatch(setIsFetching(false));
      });
  };
};

// export const login = (username: string, password: string): AppThunk => {
//   return async (dispatch) => {
//     await dispatch(setIsFetching(true));
//     axios
//       .post(API_URL + API_ROUTE_LOGIN, { username, password })
//       .then(({ data }) => {
//         const { token } = data;
//         console.log(token);
//         dispatch(setToken(token));
//       })
//       .catch((error) => {
//         console.error(error);
//         dispatch(setError(error));
//       })
//       .finally(() => {
//         dispatch(setIsFetching(false));
//       });
//   };
// };

// export const register = (data: UserData): AppThunk => {
//   return async (dispatch) => {
//     await dispatch(setIsFetching(true));
//     axios
//       .post(API_URL + API_ROUTE_REGISTER, data)
//       .then(({ data }) => {
//         const { token } = data;
//         console.log(token);
//         dispatch(setToken(token));
//       })
//       .catch((error) => {
//         console.error(error);
//         dispatch(setError(error));
//       })
//       .finally(() => {
//         dispatch(setIsFetching(false));
//       });
//   };
// };

export default userSlice.reducer;
