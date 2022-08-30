import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { fetchFitnessPlanDisplay } from "../../features/plan/slice";
import { fetchUserData } from "../../features/user/slice";
import { NutritionCard } from "./NutritionCard";
import { WorkoutCard } from "./WorkoutCard";

export const Plan = () => {
  const { plan, isFetching, error } = useAppSelector((state) => state.plan);

  const { data } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data.username) dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    if (data.username && !plan.slug)
      dispatch(fetchFitnessPlanDisplay(data.plan));
  }, [data]);

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return (
    <Container sx={{ height: "95vh" }}>
      <Grid container spacing={4} pb={4} sx={{ height: "inherit" }}>
        <Grid item md={6} xs={12}>
          <WorkoutCard plan={plan.workout} isFetching={isFetching} />
        </Grid>
        <Grid item md={6} xs={12}>
          <NutritionCard plan={plan.nutrition} isFetching={isFetching} />
        </Grid>
      </Grid>
    </Container>
  );
};
