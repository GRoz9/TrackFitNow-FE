"use client";
import React from "react";
import { WeightGraph } from "../Trackers_GraphsComponents/WeightGraph";
import { Line } from "react-chartjs-2";

import Box from "@mui/material/Box";

import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";

export const WeightTracker = (props) => {
  const { profile, weeklyLogs } = props;
  console.log("Weight", props);
  const [progress, setProgress] = React.useState(10);
  const [timeProgress, setTimeProgress] = React.useState(25);
  // weeklyLogs = weeklyLogs || [];
  // let weeklyLogs = [
  //   { logDate: "2025-09-08", weight: 91.0 },
  //   { logDate: "2025-09-09", weight: 90.8 },
  //   { logDate: "2025-09-10", weight: 90.9 },
  //   { logDate: "2025-09-11", weight: 90.7 },
  //   { logDate: "2025-09-12", weight: 90.6 },
  //   { logDate: "2025-09-13", weight: 90.4 },
  //   { logDate: "2025-09-14", weight: 90.5 },
  //   { logDate: "2025-09-15", weight: -1 },
  //   { logDate: "2025-09-16", weight: 90.2 },
  //   { logDate: "2025-09-17", weight: 90.1 },
  //   { logDate: "2025-09-18", weight: 90.0 },
  //   { logDate: "2025-09-19", weight: 89.9 },
  //   { logDate: "2025-09-20", weight: 89.8 },
  //   { logDate: "2025-09-21", weight: 89.7 },
  //   { logDate: "2025-09-22", weight: 89.8 },
  //   { logDate: "2025-09-23", weight: 89.6 },
  //   { logDate: "2025-09-24", weight: -1 },
  //   { logDate: "2025-09-25", weight: 89.4 },
  //   { logDate: "2025-09-26", weight: 89.3 },
  //   { logDate: "2025-09-27", weight: 89.2 },
  //   { logDate: "2025-09-28", weight: 89.0 },
  //   { logDate: "2025-09-29", weight: 88.9 },
  //   { logDate: "2025-09-30", weight: 88.8 },
  //   { logDate: "2025-10-01", weight: 88.7 },
  //   { logDate: "2025-10-02", weight: 88.6 },
  //   { logDate: "2025-10-03", weight: 88.5 },
  //   { logDate: "2025-10-04", weight: 88.4 },
  //   { logDate: "2025-10-05", weight: 88.3 },
  //   { logDate: "2025-10-06", weight: -1 },
  //   { logDate: "2025-10-07", weight: 88.2 },
  //   { logDate: "2025-10-11", weight: 88.1 },
  // ];

  const sortedLogs = [...weeklyLogs].reverse();
  const filteredLogs = sortedLogs.filter((log) => log.weight > 0);

  const labels = filteredLogs.map((log) =>
    new Date(log.logDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      // weekday: "short",
      // day: "numeric",
      // month: "short",
    })
  );

  const weightValues = filteredLogs.map((log) => log.weight);

  const totalDays = 90; // for example
  const dailyChange =
    (profile.startingWeight - profile.targetWeight) / totalDays;

  const targetLine = sortedLogs.map(
    (_, i) => weightValues[0] - dailyChange * i
  );

  // const labels = ["January", "February", "March", "April", "May", "June"];
  // const data = {
  //   labels: labels.reverse(),
  //   datasets: [
  //     {
  //       label: "Actual Weight Loss",
  //       backgroundColor: "#0ea5e9",
  //       borderColor: "#0ea5e9",
  //       data: validWeight.reverse(),
  //     },
  //     {
  //       label: "Expected Weight Loss",
  //       data: [
  //         95, 94.2, 93.4, 92.6, 91.8, 91, 90.2, 89.4, 88.6, 87.8, 87, 86.2,
  //         85.5, 85,
  //       ],
  //       borderColor: "red",
  //       borderDash: [5, 5],
  //       fill: false,
  //       tension: 0.2,
  //     },
  //   ],
  // };

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Actual Weight",
  //       data: weightValues,
  //       fill: false,
  //       borderColor: "#0ea5e9",
  //       tension: 0.3,
  //       pointBackgroundColor: "#0ea5e9",
  //     },
  //     {
  //       label: "Target Weight",
  //       data: targetLine,
  //       fill: false,
  //       borderColor: "#22c55e",
  //       borderDash: [5, 5],
  //       tension: 0.3,
  //     },
  //     {
  //       label: "Goal",
  //       data: [
  //         profile.targetWeight,
  //         profile.targetWeight,
  //         profile.targetWeight,
  //         profile.targetWeight,
  //         profile.targetWeight,
  //         profile.targetWeight,
  //         profile.targetWeight,
  //       ],
  //       fill: false,
  //       borderColor: "#22c55e",
  //       // borderDash: [5, 5],
  //       tension: 0.3,
  //     },
  //   ],
  // };

  const data = {
    labels,
    datasets: [
      {
        label: "Weight",
        data: weightValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      },
      {
        label: "Target",
        data: targetLine,
        fill: false,
        borderColor: "#22c55e",
        borderDash: [5, 5],
        tension: 0.3,
      },
      {
        label: "Goal",
        data: Array(sortedLogs.length).fill(profile.targetWeight),
        borderColor: "rgba(255, 99, 132, 1)",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false, // weight shouldn’t start at 0
        suggestedMin: Math.min(...weightValues) - 2,
        suggestedMax: Math.max(...weightValues) + 2,
      },
      x: {
        ticks: {
          maxTicksLimit: window.innerWidth < 640 ? 10 : 10,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Weight: ${context.parsed.y.toFixed(1)} kg`,
        },
        legend: {
          display: window.innerWidth >= 640,
          // display: window.innerWidth > 640,
        },
      },
    },
  };

  console.log();

  // The extra info is messign with the sapcing and the width

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Weight",
  //       data: weightValues,
  //       borderColor: "#0ea5e9",
  //       backgroundColor: "rgba(14,165,233,0.2)",
  //       tension: 0.3,
  //       fill: true,
  //       pointRadius: 4,
  //     },
  //     {
  //       label: "Expected Trend",
  //       data: targetLine,
  //       borderColor: "#22c55e",
  //       borderDash: [5, 5],
  //       tension: 0.3,
  //     },
  //     {
  //       label: "Goal",
  //       data: Array(filteredLogs.length).fill(profile.targetWeight),
  //       borderColor: "#ef4444",
  //       borderDash: [5, 5],
  //       pointRadius: 0,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       display: window.innerWidth > 640,
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: (ctx) => `Weight: ${ctx.parsed.y.toFixed(1)} kg`,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       ticks: {
  //         maxTicksLimit: window.innerWidth < 640 ? 5 : 10,
  //       },
  //     },
  //     y: {
  //       beginAtZero: false,
  //       suggestedMin: Math.min(...weightValues) - 1.5,
  //       suggestedMax: Math.max(...weightValues) + 1.5,
  //     },
  //   },
  // };

  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full h-full p-3 sm:p-4 gap-6">
      <div className="w-full h-[300px] sm:h-[400px]">
        <div className="h-full">
          <Line data={data} options={options} />
        </div>
      </div>
      {/* <div className="w-full">
        <div className="h-full">
          <Line data={data} options={options} />
        </div>
      </div> */}

      <div className="flex flex-col gap-4">
        <h1 className="text-center font-semibold text-lg">Statistics</h1>

        <Box className="flex flex-col gap-4 w-full">
          <BarTracker
            labels={["Progress", "Kg"]}
            progressDate={{
              start: profile.startingWeight,
              current: profile.weight,
              goal: profile.targetWeight,
              percentage: true,
            }}
          />
        </Box>

        <div className="flex flex-wrap justify-between text-center text-sm sm:text-base mt-4">
          <div className="flex-1 min-w-[100px]">
            <p className="font-medium">You Lost</p>
            <p>{(profile.startingWeight - profile.weight).toFixed(1)} kg</p>
          </div>
          <div className="flex-1 min-w-[100px]">
            <p className="font-medium">Remaining</p>
            <p>{(profile.weight - profile.targetWeight).toFixed(1)} kg</p>
          </div>
          <div className="flex-1 min-w-[100px]">
            <p className="font-medium">Weekly Avg</p>
            <p>— kg (TBD)</p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
