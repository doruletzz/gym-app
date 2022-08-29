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

  const HOME_ILLUSTRATION = "/home-illustration.svg";

  const HEADING = "TRANSFORM YOUR BODY, TODAY!";

  const SUBHEADING =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A culpa debitis nisi ex rem possimus. Totam velit necessitatibus error facere voluptates at optio possimus non blanditiis. Sed, culpa. Vitae, temporibus.";

  const CTA_BUTTON_TEXT_REGISTERED = "view plan";

  const CTA_BUTTON_TEXT = "get plan";

  return (
    <Container>
      <Grid container spacing={2} mt={{ md: 16, xs: 0 }}>
        <Grid
          item
          md={8}
          textAlign={{ md: "left", xs: "center" }}
          order={{ md: 1, xs: 2 }}
        >
          <Box>
            <Typography variant="h1" color="primary" mb={2}>
              {HEADING}
            </Typography>
            <Typography variant="subtitle1" mb={2}>
              {SUBHEADING}
            </Typography>
            {isFetching ? (
              <Skeleton component={Button} />
            ) : (
              <Button variant="contained" component={Link} to={ROUTE_PLAN}>
                {token ? CTA_BUTTON_TEXT_REGISTERED : CTA_BUTTON_TEXT}
              </Button>
            )}
          </Box>
        </Grid>
        <Grid
          item
          md={4}
          marginX="auto"
          marginY="auto"
          width={{ md: "100%", xs: "50%" }}
          order={{ md: 2, xs: 1 }}
        >
          <Box
            component="img"
            alt="home"
            src={HOME_ILLUSTRATION}
            width="100%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
