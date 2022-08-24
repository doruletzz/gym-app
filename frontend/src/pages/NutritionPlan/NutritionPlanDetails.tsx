import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { fetchNutritionPlanDetails } from "../../features/plan/slice";

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
  const {
    plan: { nutrition },
    isFetching,
    error,
  } = useAppSelector((state) => state.plan);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!nutrition.isDetailed) dispatch(fetchNutritionPlanDetails(slug));
  }, []);

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return <Box>{nutrition.title}</Box>;
};
