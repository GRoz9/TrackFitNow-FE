import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Fab from "@mui/material/Fab";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Fab
        color="primary"
        sx={{
          zIndex: 0,
          boxShadow: 0,
          "&:hover": { backgroundColor: "white", color: "black" },
        }}
        href="https://github.com/GRoz9"
      >
        <GitHubIcon />
      </Fab>
      <p className="m-4">©TrackFitNow! 2025</p>
    </div>
  );
};
