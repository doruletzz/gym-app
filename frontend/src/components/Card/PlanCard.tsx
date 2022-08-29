import {
  CardContent,
  CardHeader,
  CardMedia,
  Card,
  Skeleton,
  CardActionArea,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export type PlanCardProps = {
  isFetching: boolean;
  slug: string;
  subtitle: string;
  title?: string;
  from?: string;
  to?: string;
  age?: number;
  level?: "beginner" | "intermediate" | "advanced";
  gender?: "M" | "F" | "O";
  height?: number;
  imageSrc?: string;
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
}));

export const PlanCard = ({
  isFetching,
  slug,
  age,
  from,
  to,
  gender,
  height,
  title,
  subtitle,
  imageSrc,
}: PlanCardProps) => {
  return (
    <StyledCard>
      <CardActionArea
        component={Link}
        to={slug}
        sx={{ height: "100%", position: "relative " }}
      >
        <CardHeader
          title={isFetching ? <Skeleton height={25} /> : title}
          subheader={isFetching ? <Skeleton height={10} /> : subtitle}
        />
        <CardContent>
          {isFetching ? (
            <>
              <Skeleton height={10} />
              <Skeleton height={10} />
              <Skeleton height={10} />
              <Skeleton height={10} />
            </>
          ) : (
            <>
              {from && to && (
                <Typography variant="body1">
                  from: {from.split("T")[0].replaceAll("-", "/")}, to:{" "}
                  {to.split("T")[0].replaceAll("-", "/")}
                </Typography>
              )}
              {/* {from && ( */}
              {/* <Typography variant="body1">{from.valueOf()}</Typography> */}
              {/* )} */}
              {/* {to && <Typography variant="body1">{to.valueOf()}</Typography>} */}
            </>
          )}
        </CardContent>

        {isFetching ? (
          <Skeleton height={140} />
        ) : (
          imageSrc && (
            <CardMedia
              component="img"
              image={imageSrc}
              height="100%"
              alt={title}
            />
          )
        )}
      </CardActionArea>
    </StyledCard>
  );
};
