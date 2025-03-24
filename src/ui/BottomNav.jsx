"use client";
import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Dashboard"
            icon={<SpaceDashboardOutlinedIcon />}
            component={Link}
            href="/dashboard"
          />
          <BottomNavigationAction
            label="Weight"
            icon={<MonitorWeightOutlinedIcon />}
            component={Link}
            href="/weight"
          />
          <BottomNavigationAction
            label="Calories"
            icon={<LocalDiningOutlinedIcon />}
            component={Link}
            href="/dashboard"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
