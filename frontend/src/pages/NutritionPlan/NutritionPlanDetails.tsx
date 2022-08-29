import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CollapsableTable, EnhancedTable } from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  fetchNutritionPlanDetails,
  FitnessPlan,
} from "../../features/plan/slice";

type NutritionPlanDetailsProps = {
  slug: string;
};

type NutritionPlanDetailsState = {
  title: string;
  subtitle: string;
  nutritionist: string;
  from?: Date;
  to?: Date;
  plan: Array<string>;
};

export const NutritionPlanDetails = ({ slug }: NutritionPlanDetailsProps) => {
  const { plan, isFetching, error } = useAppSelector((state) => state.plan);

  const { nutrition } = plan as FitnessPlan;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!nutrition.isDetailed) dispatch(fetchNutritionPlanDetails(slug));
  }, []);

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return (
    <Box>
      <Typography variant="h4">{nutrition.title}</Typography>
      <Typography variant="subtitle1">
        {nutrition.subtitle}, by {nutrition.nutritionist}
      </Typography>
      {nutrition.from && nutrition.to && (
        <Typography variant="body1">
          from: {nutrition.from.toString().split("T")[0].replaceAll("-", "/")},
          to: {nutrition.to.toString().split("T")[0].replaceAll("-", "/")}
        </Typography>
      )}
      <br />
      {nutrition.plan && (
        <>
          <Typography variant="h6">Plan:</Typography>
          <Paper>
            <EnhancedTable
              columns={Object.keys(nutrition.plan[0])}
              rows={nutrition.plan}
              // caption={"Note: " + entry.details}
            />
          </Paper>
        </>
      )}
      {/* <Typography variant="h4">{workout.title}</Typography> */}
    </Box>
  );
};
