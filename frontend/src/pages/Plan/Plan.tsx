import { Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { fetchFitnessPlan } from "../../features/plan/slice";
import { NutritionCard } from "./NutritionCard";
import { WorkoutCard } from "./WorkoutCard";

export const Plan = () => {
  const { token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) dispatch(fetchFitnessPlan(token));
  }, []);

  if (!token) return <Navigate to="/register" />;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <WorkoutCard />
        </Grid>
        <Grid item md={6} xs={12}>
          <NutritionCard />
        </Grid>
      </Grid>
    </Container>
  );
};
