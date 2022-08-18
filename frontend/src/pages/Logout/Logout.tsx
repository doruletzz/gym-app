import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { removeToken } from "../../features/auth/slice";
import { ROUTE_HOME } from "../../utils/constants";

export const Logout = () => {
  const { token, isFetching } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) dispatch(removeToken());
  }, []);

  if (token || isFetching) return <CircularProgress />;

  return <Navigate to={ROUTE_HOME} />;
};
