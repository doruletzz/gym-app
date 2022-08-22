import {
  CardContent,
  CardHeader,
  CardMedia,
  Card,
  Skeleton,
  CardActionArea,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export type PlanCardProps = {
  isFetching: boolean;
  slug: string;
  subtitle: string;
  title?: string;
  from?: Date;
  to?: Date;
  age?: number;
  level?: "beginner" | "intermediate" | "advanced";
  gender?: "M" | "F" | "O";
  height?: number;
  imageSrc?: string;
};

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
    <Card>
      <CardActionArea component={Link} to={slug}>
        {
          <CardHeader
            title={isFetching ? <Skeleton height={25} /> : title}
            subheader={isFetching ? <Skeleton height={10} /> : subtitle}
          />
        }
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
              {age && <Typography variant="body1">{age}</Typography>}
              {height && <Typography variant="body1">{height}</Typography>}
              {gender && <Typography variant="body1">{gender}</Typography>}
              {from && (
                <Typography variant="body1">{from.valueOf()}</Typography>
              )}
              {to && <Typography variant="body1">{to.valueOf()}</Typography>}
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
              height={140}
              alt={title}
            />
          )
        )}
      </CardActionArea>
    </Card>
  );
};
