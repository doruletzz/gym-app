import { CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React from "react";
import Card from "../../components/Card";
import { ROUTE_PLAN, ROUTE_WORKOUT } from "../../utils/constants";

const title = "Workout Card";

const subtitle = "Your personalized nutrition card";

const content = [<p>subtitle</p>, <p>at</p>];

const imageSrc = "/vite.svg";

const slug = "/12";

export const WorkoutCard = () => {
  return (
    <Card
      isFetching={true}
      slug={ROUTE_WORKOUT + slug}
      title={title}
      subtitle={subtitle}
      content={content}
      imageSrc={imageSrc}
    />
  );
};
