import React from "react";
import Card from "../../components/Card";
import { PlanCardProps } from "../../components/Card/PlanCard";
import { NutritionPlan } from "../../features/plan/slice";
import {
  ROUTE_PLAN,
  ROUTE_NUTRITION,
  API_ROUTE_NUTRITION_PLAN,
} from "../../utils/constants";

// const title = "Nutrition Card";

// const subtitle = "Your personalized nutrition card";

// const content = [<h1>subtitle</h1>, <p>at</p>, <p>2</p>];

// const imageSrc = "/vite.svg";

// const slug = "/12";

type NutritionCardProps = {
  plan: NutritionPlan;
  isFetching: boolean;
};

export const NutritionCard = ({ plan, isFetching }: NutritionCardProps) => {
  const NUTRITION_CARD_ILLUSTRATION_SRC = "./nutrition-illustration.svg";

  return (
    <Card
      isFetching={isFetching}
      slug={ROUTE_NUTRITION + "/" + plan.slug ?? ""}
      title={plan.title ?? ""}
      subtitle={plan.subtitle ?? ""}
      from={plan.from?.toString()}
      to={plan.to?.toString()}
      imageSrc={NUTRITION_CARD_ILLUSTRATION_SRC}
    />
  );
};
