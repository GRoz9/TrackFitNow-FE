"use client";
import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export const CalorieTracker = () => {
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Calories",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        // backgroundColor: "#0ea5e9",
        // borderColor: "#0ea5e9",
        data: [2260, 1270, 2200, 1718, 2100, 1700, 1500],
      },
      // {
      //   label: "Target Calories - 2000Kcal",
      //   backgroundColor: "rgb(50, 200, 75)",
      //   borderColor: "rgb(255, 99, 132)",
      //   data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
      // },
    ],
  };

  return (
    <div className="flex justify-evenly bg-cyan-100 drop-shadow-xl rounded-xl h-3/4 max-lg:justify-center ">
      <div className="flex flex-col justify-between max-sm:w-full max-lg:w-3/4 lg:w-full">
        <Bar data={data} />
        <div className="flex justify-evenly text-center m-4">
          <h1>
            Avg Intake<br></br>
            {(
              data.datasets[0].data.reduce((sum, value) => sum + value, 0) /
              data.datasets[0].data.length
            ).toFixed(0)}
            Kcal
          </h1>
          <h1>
            Daily Target <br />
            2000Kcal
          </h1>
        </div>
      </div>
    </div>
  );
};
