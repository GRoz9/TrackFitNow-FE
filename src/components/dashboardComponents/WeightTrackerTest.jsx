"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";

export const WeightTrackerTest = (props) => {
  const { profile } = props;

  // 🧪 Dummy data for now
  const weeklyLogs = [
    { logDate: "2025-09-08", weight: 91.0 },
    { logDate: "2025-09-09", weight: 90.8 },
    { logDate: "2025-09-10", weight: 90.9 },
    { logDate: "2025-09-11", weight: 90.7 },
    { logDate: "2025-09-12", weight: 90.6 },
    { logDate: "2025-09-13", weight: 90.4 },
    { logDate: "2025-09-14", weight: 90.5 },
    { logDate: "2025-09-15", weight: -1 },
    { logDate: "2025-09-16", weight: 90.2 },
    { logDate: "2025-09-17", weight: 90.1 },
    { logDate: "2025-09-18", weight: 90.0 },
    { logDate: "2025-09-19", weight: 89.9 },
    { logDate: "2025-09-20", weight: 89.8 },
    { logDate: "2025-09-21", weight: 89.7 },
    { logDate: "2025-09-22", weight: 89.8 },
    { logDate: "2025-09-23", weight: 89.6 },
    { logDate: "2025-09-24", weight: -1 },
    { logDate: "2025-09-25", weight: 89.4 },
    { logDate: "2025-09-26", weight: 89.3 },
    { logDate: "2025-09-27", weight: 89.2 },
    { logDate: "2025-09-28", weight: 89.0 },
    { logDate: "2025-09-29", weight: 88.9 },
    { logDate: "2025-09-30", weight: 88.8 },
    { logDate: "2025-10-01", weight: 88.7 },
    { logDate: "2025-10-02", weight: 88.6 },
    { logDate: "2025-10-03", weight: 88.5 },
    { logDate: "2025-10-04", weight: 88.4 },
    { logDate: "2025-10-05", weight: 88.3 },
    { logDate: "2025-10-06", weight: -1 },
    { logDate: "2025-10-07", weight: 88.2 },
    { logDate: "2025-10-08", weight: 88.1 },
  ];

  // Filter out -1 values
  const filteredLogs = weeklyLogs.filter((log) => log.weight > 0);

  // Labels
  const labels = filteredLogs.map((log) =>
    new Date(log.logDate).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
    })
  );

  // Values
  const weightValues = filteredLogs.map((log) => log.weight);

  // Expected line
  const totalDays = 90;
  const dailyChange =
    (profile.startingWeight - profile.targetWeight) / totalDays;

  const targetLine = filteredLogs.map(
    (_, i) => weightValues[0] - dailyChange * i
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Weight",
        data: weightValues,
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14,165,233,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      },
      {
        label: "Expected Trend",
        data: targetLine,
        borderColor: "#22c55e",
        borderDash: [5, 5],
        tension: 0.3,
      },
      {
        label: "Goal",
        data: Array(filteredLogs.length).fill(profile.targetWeight),
        borderColor: "#ef4444",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: window.innerWidth > 640,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Weight: ${ctx.parsed.y.toFixed(1)} kg`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: window.innerWidth < 640 ? 5 : 10,
        },
      },
      y: {
        beginAtZero: false,
        suggestedMin: Math.min(...weightValues) - 1.5,
        suggestedMax: Math.max(...weightValues) + 1.5,
      },
    },
  };

  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full p-4 sm:p-6 gap-6">
      {/* Chart Section */}
      <div className="w-full h-[300px] sm:h-[400px] overflow-x-auto">
        <div className="min-w-[600px] h-full">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-semibold text-lg">
          Current Statistics
        </h1>

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
    </div>
  );
};
