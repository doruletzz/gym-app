import {
  CardContent,
  Card,
  CardHeader,
  Container,
  Grid,
  Stack,
  Box,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { fetchAllFitnessPlans } from "../../features/plans/slice";
import { Link } from "react-router-dom";
import { ROUTE_NUTRITION_ADD, ROUTE_WORKOUT_ADD } from "../../utils/constants";

export const PlansDisplay = () => {
  const { plans, isFetching, error } = useAppSelector((state) => state.plans);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!plans.length) dispatch(fetchAllFitnessPlans());
  }, []);

  return (
    <Container>
      <Button component={Link} to="add">
        ADD PLAN
      </Button>
      <Button component={Link} to={"../" + ROUTE_WORKOUT_ADD}>
        ADD WORKOUT PLAN
      </Button>
      <Button component={Link} to={"../" + ROUTE_NUTRITION_ADD}>
        ADD NUTRITION PLAN
      </Button>
      <Grid container>
        {plans &&
          plans.map((plan) => (
            <Grid item key={plan.slug}>
              <Card>
                <CardHeader title={plan.slug} sx={{ textAlign: "center" }} />
                <CardContent>
                  <Stack direction="row">
                    <Box width="100%" p={2}>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={plan.nutrition.slug}
                        sx={{ textDecoration: "none" }}
                      >
                        {plan.nutrition.slug}
                      </Typography>
                    </Box>
                    <Box width="100%" p={2}>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={plan.workout.slug}
                        sx={{ textDecoration: "none" }}
                      >
                        {plan.workout.slug}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};
