"use client";
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const BarTracker = (props) => {
  const { current = 0, goal = 100 } = props.progressDate;
  const progress = goal && goal > 0 ? (current / goal) * 100 : 0;
  return (
    <Box sx={{ display: "flex", alignItems: "center", zIndex: 0 }}>
      <Box sx={{ minWidth: 65 }}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {props.labels[0]}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)} // Cap at 100%
          sx={props.sx && Object.keys(props.sx).length ? props.sx : undefined}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {`${Math.round(current)}${props.labels[1] ?? "%"}`}
        </Typography>
      </Box>
    </Box>
  );
};
