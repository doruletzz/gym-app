import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NutritionPlanDetails } from "./NutritionPlanDetails";

export const NutritionPlan = () => {
  const { slug } = useParams<string>();

  return <Container>{slug && <NutritionPlanDetails slug={slug} />}</Container>;
};
