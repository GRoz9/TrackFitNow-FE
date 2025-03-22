import React from "react";
import { Typography, Link } from "@mui/material";

export const BackButton = (props) => {
  return (
    <Typography sx={{ textAlign: "center", ...props.sx }}>
      <Link
        color="inherit"
        underline="hover"
        href={props.href}
        variant="body2"
        sx={{ alignSelf: "center", fontSize: "1rem" }}
      >
        {props.label}
      </Link>
    </Typography>
  );
};
