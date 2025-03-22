"use client";
import React from "react";
import { WeightGraph } from "../Trackers_GraphsComponents/WeightGraph";

import Box from "@mui/material/Box";

import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";

export const WeightTracker = () => {
  const [progress, setProgress] = React.useState(10);
  const [timeProgress, setTimeProgress] = React.useState(25);

  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Actual Weight Loss",
        backgroundColor: "#0ea5e9",
        borderColor: "#0ea5e9",
        data: [95, 94.5, 94, 93.8, 93, 92.5, 92],
      },
      {
        label: "Expected Weight Loss",
        data: [
          95, 94.2, 93.4, 92.6, 91.8, 91, 90.2, 89.4, 88.6, 87.8, 87, 86.2,
          85.5, 85,
        ],
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
        tension: 0.2,
      },
    ],
  };

  // The extra info is messign with the sapcing and the width
  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-xl w-full h-full gap-4">
      <WeightGraph data={data} />
      <div className="max-lg:m-2 m-4 gap-8 flex flex-col h-full justify-center">
        <h1 className="text-center">Current Statisctics</h1>
        <Box className="flex flex-col gap-4" sx={{ width: "100%" }}>
          <BarTracker
            labels={["Progress"]}
            progressDate={{ current: 25 }}
            sx={{ height: 5, borderRadius: 5 }}
          />
          <BarTracker
            labels={["Time"]}
            progressDate={{ current: 35 }}
            sx={{ height: 5, borderRadius: 5 }}
          />
        </Box>

        {/* <hr className="border-t-2 border-sky-500 border-gray-600 " /> */}

        <div className="flex justify-between text-center">
          <h1>
            You Lost<br></br>4.4Kg
          </h1>
          <h1>
            Remaining<br></br>5.1Kg
          </h1>
          <h1>
            Avg Weekly Lose<br></br>
            {(0.1 * 7).toFixed(1)}Kg
          </h1>
        </div>

        {/* <div className="flex justify-between text-center">
            <h1>
              Body Fat<br></br>21.3%
            </h1>
            <h1>
              Average Daily Lose<br></br>0.1Kg
            </h1>
            <h1>
              Average Weekly Lose<br></br>
              {(0.1 * 7).toFixed(1)}Kg
            </h1>
          </div>
          <div className="flex justify-evenly mx-4">
            <h1>BMI: 27.4</h1>
            <h1>Overweight</h1>
          </div>
          <div className="flex justify-between text-center">
            <h1>
              Remaning<br></br>4.4Kg
            </h1>
            <h1>
              Average Daily Lose<br></br>0.1Kg
            </h1>
            <h1>
              Average Weekly Lose<br></br>
              {(0.1 * 7).toFixed(1)}Kg
            </h1>
          </div> */}
      </div>
    </div>
  );
};
