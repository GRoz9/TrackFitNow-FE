"use client";
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const BarTracker = (props) => {
  const { current = 0, goal = 100, start, percentage } = props.progressDate;

  let progress = 0;

  if (start !== undefined && start !== null) {
    if (goal < start) {
      // Weight loss goal (downward)
      progress = ((start - current) / (start - goal)) * 100;
    } else {
      // Weight gain or general progress (upward)
      progress = ((current - start) / (goal - start)) * 100;
    }
  } else {
    // Default behaviour if no start given (like protein intake)
    progress = goal > 0 ? (current / goal) * 100 : 0;
  }

  progress = Math.max(-100, Math.min(progress, 100)); // clamp between -100–100

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
          value={progress}
          sx={props.sx && Object.keys(props.sx).length ? props.sx : undefined}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {percentage
            ? progress.toFixed(2) + "%"
            : (current + "" + props.labels[1] ?? "")}
        </Typography>
      </Box>
    </Box>
  );
};
