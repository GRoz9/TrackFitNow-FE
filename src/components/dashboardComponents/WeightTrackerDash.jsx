"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { useChartSetup } from "@/app/lib/ChartSetup";
import Box from "@mui/material/Box";
import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";

export const WeightTracker = (props) => {
  useChartSetup();
  const { profile, weeklyLogs } = props;
  console.log("Weight", props);

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

  // Sort and filter logs (skip missing weights)
  const sortedLogs = [...weeklyLogs].reverse();
  const filteredLogs = sortedLogs.filter((log) => log.weight > 0);

  const labels = filteredLogs.map((log) =>
    new Date(log.logDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
  );

  const weightValues = filteredLogs.map((log) => log.weight);

  // Create target line assuming a 90-day plan
  const totalDays = 90;
  const dailyChange =
    (profile.startingWeight - profile.targetWeight) / totalDays;

  const targetLine = sortedLogs.map(
    (_, i) => weightValues[0] - dailyChange * i,
  );

  const weightChange = (startingWeight, currentWeight) => {
    if (startingWeight && currentWeight) {
      if (currentWeight <= startingWeight) {
        return `- ${(startingWeight - currentWeight).toFixed(2)} Kg`;
      } else {
        return `+ ${(currentWeight - startingWeight).toFixed(2)} Kg`;
      }
    } else {
      return "—";
    }
  };

  const remainingWeight = (targetWeight, currentWeight) => {
    if (targetWeight && currentWeight) {
      if (currentWeight <= targetWeight) {
        return `${(targetWeight - currentWeight).toFixed(2)} Kg`;
      } else {
        return `${(currentWeight - targetWeight).toFixed(2)} Kg`;
      }
    } else {
      return "—";
    }
  };

  // --- Average Weekly Weight Loss Calculation ---
  let avgWeeklyLoss = null;
  if (filteredLogs.length > 1) {
    const startWeight = filteredLogs[0].weight;
    const latestWeight = filteredLogs[filteredLogs.length - 1].weight;

    const startDate = new Date(filteredLogs[0].logDate);
    const latestDate = new Date(filteredLogs[filteredLogs.length - 1].logDate);

    const diffDays = (latestDate - startDate) / (1000 * 60 * 60 * 24);

    if (diffDays > 0) {
      avgWeeklyLoss = ((startWeight - latestWeight) / diffDays) * 7;
    }
  }

  // --- Chart Data ---
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
        pointRadius: 2,
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
        beginAtZero: false,
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
      },
      // legend: {
      //   display: window.innerWidth >= 640,
      // },
    },
  };

  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full h-full p-3 sm:p-4 gap-6">
      {/* Graph */}
      <div className="w-full h-[300px] sm:h-[400px]">
        <div className="h-full">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Statistics */}
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-semibold text-lg">Statistics</h1>

        <Box className="flex flex-col gap-4 w-full">
          <BarTracker
            labels={["Progress", "Kg"]}
            progressDate={{
              start: profile.startingWeight,
              current: profile.currentWeight,
              goal: profile.targetWeight,
              percentage: true,
            }}
          />
        </Box>

        {/* Stats Summary */}
        <div className="flex flex-wrap justify-between text-center text-sm sm:text-base mt-4">
          <div className="flex-1 min-w-[100px]">
            <p className="font-medium text-black text-lg">
              {weightChange(profile.startingWeight, profile.currentWeight)}
            </p>
            <p className="text-sm text-gray-600">Change</p>
          </div>

          <div className="flex-1 min-w-[100px]">
            <p className="font-medium text-black text-lg">
              {remainingWeight(profile.targetWeight, profile.currentWeight)}
            </p>
            <p className="text-sm text-gray-600">Remaining</p>
          </div>

          <div className="flex-1 min-w-[100px]">
            {/* <p className="font-medium">7-Day Change</p> */}
            <p className="font-medium text-black text-lg">
              {avgWeeklyLoss !== null
                ? `${avgWeeklyLoss.toFixed(1)} kg/week`
                : "—"}
            </p>
            <p className="text-sm text-gray-600">Weekly Avg</p>
          </div>
        </div>
      </div>
    </div>
  );
};
