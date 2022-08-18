import {
  CardContent,
  CardHeader,
  CardMedia,
  Card,
  Skeleton,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export type PlanCardProps = {
  isFetching: boolean;
  slug: string;
  subtitle: string;
  title?: string;
  content?: JSX.Element[];
  imageSrc?: string;
};

export const PlanCard = ({
  isFetching,
  slug,
  title,
  subtitle,
  content,
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
            </>
          ) : (
            content && content.map((el, index) => <div key={index}>{el}</div>)
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
