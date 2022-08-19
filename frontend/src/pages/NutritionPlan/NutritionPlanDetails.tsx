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
  const { token } = useAppSelector((state) => state.auth);

  const { plan, isFetching, error } = useAppSelector((state) => state.plan);

  const dispatch = useAppDispatch();

  const [values, setValues] = useState<NutritionPlanDetailsState>({
    title: "",
    subtitle: "",
    plan: [],
    nutritionist: "",
  });

  useEffect(() => {
    if (!plan.nutrition) dispatch(fetchNutritionPlanDetails(slug));
  }, []);

  if (!token) return <Navigate to="/" />;

  if (isFetching) return <CircularProgress />;

  if (error.message)
    return <Typography variant="h1">{error.message} </Typography>;

  return <Box>{slug}</Box>;
};
