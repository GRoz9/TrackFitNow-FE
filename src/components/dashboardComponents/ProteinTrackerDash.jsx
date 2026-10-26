"use client";
import React, { useState } from "react";
import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ValueEditorDialog from "../dialogComponents/AddDialog";
import { Fab } from "@mui/material";

import { UpdateProteinAPI } from "@/app/api/Protein/ProteinAPI";

export const ProteinTracker = (props) => {
  const [protein, setProtein] = useState(props.weeklyLogs[0].proteinIntake);
  const proteinGoal = props.proteinTarget;

  const { openDialog, ValueDialog } = ValueEditorDialog({
    label: "Protein",
    unit: "g",
    currentValue: protein,
    goalValue: proteinGoal,
    onUpdate: (newVal) => {
      setProtein(newVal);
      UpdateProteinAPI(newVal);
    },
  });

  return (
    <div className="flex flex-col justify-evenly h-full bg-cyan-100 shadow-xl rounded-xl text-center">
      <div className="flex flex-col gap-4 m-4">
        <h1>Protein Target - {proteinGoal}g</h1>

        <BarTracker
          labels={["Target", "g"]}
          progressDate={{ current: protein, goal: proteinGoal }}
        />

        <div className="flex justify-evenly w-full">
          <Fab color="primary" onClick={() => openDialog("add")}>
            <AddIcon />
          </Fab>
          <Fab onClick={() => openDialog("edit")}>
            <EditIcon />
          </Fab>
        </div>
      </div>

      <div hidden>{ValueDialog}</div>
    </div>
  );
};
