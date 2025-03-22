import React from "react";
import { Typography } from "@mui/material";

export const Header = (props) => {
  return (
    <div className="text-center">
      <Typography component="h1" variant="h4">
        {props.title}
      </Typography>
      <Typography component="h1" variant="h6">
        {props.subTitle}
      </Typography>
    </div>
  );
};
