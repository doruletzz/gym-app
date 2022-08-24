import { CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React from "react";
import Card from "../../components/Card";
import { ROUTE_PLAN, ROUTE_WORKOUT } from "../../utils/constants";

import { WorkoutPlan } from "../../features/plan/slice";

type WorkoutCardProps = {
  plan: WorkoutPlan;
  isFetching: boolean;
};

export const WorkoutCard = ({ plan, isFetching }: WorkoutCardProps) => {
  const WORKOUT_CARD_ILLUSTRATION_SRC = "./workout-illustration.svg";

  return (
    <Card
      isFetching={isFetching}
      slug={ROUTE_WORKOUT + "/" + plan.slug}
      title={plan.title ?? ""}
      subtitle={plan.subtitle ?? ""}
      from={plan.from}
      to={plan.to}
      imageSrc={WORKOUT_CARD_ILLUSTRATION_SRC}
    />
  );
};
