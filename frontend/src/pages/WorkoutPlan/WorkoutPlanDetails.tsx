import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  fetchNutritionPlanDetails,
  fetchWorkoutPlanDetails,
} from "../../features/plan/slice";

type WorkoutPlanDetailsProps = {
  slug: string;
};

type WorkoutPlanDetailsState = {
  title: string;
  subtitle: string;
  nutritionist: string;
  from?: Date;
  to?: Date;
  plan: Array<string>;
};

export const WorkoutPlanDetails = ({ slug }: WorkoutPlanDetailsProps) => {
  const { token } = useAppSelector((state) => state.auth);

  const {
    plan: { workout },
    isFetching,
    error,
  } = useAppSelector((state) => state.plan);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && !workout.isDetailed) dispatch(fetchWorkoutPlanDetails(slug));
  }, []);

  if (!token) return <Navigate to="/" />;

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return <Box>{workout.title}</Box>;
};
