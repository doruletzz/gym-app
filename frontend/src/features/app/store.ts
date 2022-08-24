import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from "@reduxjs/toolkit";
// ...
import authReducer from "../auth";
import planReducer from "../plan";
import userReducer from "../user";

const combinedReducer = combineReducers({
  auth: authReducer,
  plan: planReducer,
  user: userReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/removeToken") state = {} as RootState;

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
