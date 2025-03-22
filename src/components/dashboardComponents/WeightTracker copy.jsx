"use client";
import React from "react";
import { Line } from "react-chartjs-2";

export const WeightTracker = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Actual Weight Loss",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
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

  return (
    <div className="mr-16 inline-block w-full bg-cyan-100 shadow-xl rounded-xl">
      <div className="flex flex-col justify-center">
        <Line data={data} />
        <div className="m-4 gap-12 flex flex-col">
          <h1 className="text-center">Current Statisctics</h1>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
          <div className="flex justify-between text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};
