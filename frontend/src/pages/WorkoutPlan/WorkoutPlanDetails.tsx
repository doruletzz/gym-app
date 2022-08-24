import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
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
  trainer: string;
  from?: Date;
  to?: Date;
  plan: Array<string>;
};

export const WorkoutPlanDetails = ({ slug }: WorkoutPlanDetailsProps) => {
  const {
    plan: { workout },
    isFetching,
    error,
  } = useAppSelector((state) => state.plan);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workout.isDetailed) dispatch(fetchWorkoutPlanDetails(slug));
  }, []);

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return (
    <Box>
      <Typography variant="h4">{workout.title}</Typography>
      <Typography variant="subtitle1">
        {workout.subtitle}, by {workout.trainer}
      </Typography>
      <Typography variant="subtitle2">
        from: {workout.from}, to: {workout.to}
      </Typography>
      {workout.plan &&
        workout.plan.map((entry) => (
          <>
            <Typography key={entry.day} variant="body1">
              Day {entry.day}:{entry.details}
            </Typography>
            <List>
              {entry.exercises.map((exercise) => (
                <ListItem>
                  {exercise.name} sets: {exercise.sets}, reps: {exercise.reps}
                </ListItem>
              ))}
            </List>
          </>
        ))}
      {/* <Typography variant="h4">{workout.title}</Typography> */}
    </Box>
  );
};
