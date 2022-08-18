import React from "react";
import Card from "../../components/Card";
import { ROUTE_PLAN, ROUTE_NUTRITION } from "../../utils/constants";

const title = "Nutrition Card";

const subtitle = "Your personalized nutrition card";

const content = [<h1>subtitle</h1>, <p>at</p>, <p>2</p>];

const imageSrc = "/vite.svg";

const slug = "/12";

export const NutritionCard = () => {
  return (
    <Card
      isFetching={false}
      slug={ROUTE_NUTRITION + slug}
      title={title}
      subtitle={subtitle}
      content={content}
      imageSrc={imageSrc}
    />
  );
};
