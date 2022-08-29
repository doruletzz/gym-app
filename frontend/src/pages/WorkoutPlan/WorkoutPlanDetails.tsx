import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Table,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  fetchNutritionPlanDetails,
  fetchWorkoutPlanDetails,
} from "../../features/plan/slice";

import { EnhancedTable, CollapsableTable } from "../../components/Table";

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
      {workout.from && workout.to && (
        <Typography variant="body1">
          from: {workout.from.split("T")[0].replaceAll("-", "/")}, to:{" "}
          {workout.to.split("T")[0].replaceAll("-", "/")}
        </Typography>
      )}
      <br />
      {workout.plan && (
        <Box>
          <Typography variant="h6">Plan:</Typography>
          {workout.plan.map((entry, idx) => (
            <CollapsableTable
              key={idx}
              columns={[""]}
              rowsCollapsed={[
                <Typography key={entry.day} variant="body1" my="auto">
                  Day: {entry.day}
                </Typography>,
              ]}
              rowsExpanded={[
                <>
                  <EnhancedTable
                    columns={Object.keys(entry.exercises[0])}
                    rows={entry.exercises}
                    caption={"Note: " + entry.details}
                  />
                </>,
              ]}
            />
          ))}
        </Box>
      )}
      {/* <Typography variant="h4">{workout.title}</Typography> */}
    </Box>
  );
};
