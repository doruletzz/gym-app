import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../features/app/hooks";
import { ROUTE_PLAN } from "../../utils/constants";

export const Home = () => {
  const { token, isFetching } = useAppSelector((state) => state.auth);

  const HEADING = "HEADING TITLE";

  const SUBHEADING =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A culpa debitis nisi ex rem possimus. Totam velit necessitatibus error facere voluptates at optio possimus non blanditiis. Sed, culpa. Vitae, temporibus.";

  const CTA_BUTTON_TEXT_REGISTERED = "view plan";

  const CTA_BUTTON_TEXT = "get plan";

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Box>
            <Typography variant="h1">{HEADING}</Typography>
            <Typography variant="subtitle1">{SUBHEADING}</Typography>
            {isFetching ? (
              <Skeleton component={Button} />
            ) : (
              <Button variant="contained" component={Link} to={ROUTE_PLAN}>
                {token ? CTA_BUTTON_TEXT_REGISTERED : CTA_BUTTON_TEXT}
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
};
