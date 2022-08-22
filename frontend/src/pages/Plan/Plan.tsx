import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { fetchFitnessPlanDisplay } from "../../features/plan/slice";
import { NutritionCard } from "./NutritionCard";
import { WorkoutCard } from "./WorkoutCard";

export const Plan = () => {
  const { token } = useAppSelector((state) => state.auth);

  const { plan, isFetching, error } = useAppSelector((state) => state.plan);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) dispatch(fetchFitnessPlanDisplay());
  }, []);

  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);

  if (!token) return <Navigate to="/register" />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <WorkoutCard />
        </Grid>
        <Grid item md={6} xs={12}>
          <NutritionCard plan={plan.nutrition} isFetching={isFetching} />
        </Grid>
      </Grid>
    </Container>
  );
};
