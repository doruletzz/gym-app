import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
// ...
import authReducer from "../auth";
import planReducer from "../plan";
import userReducer from "../user";

export const store = configureStore({
  reducer: { auth: authReducer, plan: planReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
