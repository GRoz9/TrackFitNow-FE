import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Fab from "@mui/material/Fab";

export const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="flex flex-col items-center">
      <Fab
        color="primary"
        sx={{
          zIndex: 0,
          boxShadow: 0,
          marginTop: 1,
          "&:hover": { backgroundColor: "white", color: "black" },
        }}
        href="https://github.com/GRoz9"
      >
        <GitHubIcon />
      </Fab>
      <p className="m-4">©TrackFitNow! {year}</p>
    </div>
  );
};
