import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { WorkoutPlanDetails } from "./WorkoutPlanDetails";

export const WorkoutPlan = () => {
  const { slug } = useParams<string>();

  return <Container>{slug && <WorkoutPlanDetails slug={slug} />}</Container>;
};
