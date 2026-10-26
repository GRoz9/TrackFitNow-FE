"use client";
import React, { useRef, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";
import { useChartSetup } from "@/app/lib/ChartSetup";
import AddIcon from "@mui/icons-material/Add";
import AddDialog from "../dialogComponents/AddDialog";
import { UpdateWeightAPI } from "@/app/api/Weight/WeightAPI";

export default function WeightPage({ profile, weeklyLogs }) {
  console.log("profile", weeklyLogs);
  useChartSetup();
  const [range, setRange] = useState(90);
  // const [weight, setWeight] = useState(userProfile.currentWeight);
  const [userProfile, setUserProfile] = useState(profile);
  const [Logs, setWeeklyLogs] = useState(weeklyLogs);
  const { openDialog: openWeightDialog, ValueDialog: WeightDialog } = AddDialog(
    {
      label: "Weight",
      unit: "kg",
      currentValue: userProfile.currentWeight,
      goalValue: userProfile.targetWeight,
      onUpdate: async (newWeight) => {
        try {
          await UpdateWeightAPI(newWeight);
          setUserProfile((prev) => ({
            ...prev,
            currentWeight: newWeight,
          }));
          setWeeklyLogs((prevLogs) =>
            prevLogs.map((log) =>
              log.logDate === new Date().toISOString().split("T")[0]
                ? { ...log, weight: newWeight }
                : log,
            ),
          );
        } catch (err) {
          console.error("Error updating weight:", err);
        }
      },
    },
  );

  const filteredLogs = useMemo(() => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - range);
    cutoffDate.setHours(0, 0, 0, 0);

    return Logs.filter((log) => {
      // FIX: Force midday to avoid timezone shifting the date backwards
      const logDate = new Date(`${log.logDate}T12:00:00`);
      return logDate >= cutoffDate && log.weight >= 0;
    }).sort((a, b) => new Date(a.logDate) - new Date(b.logDate));
  }, [Logs, range]);

  const labels = filteredLogs.map((log) =>
    new Date(`${log.logDate}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
  );
  const weightValues = filteredLogs.map((log) => log.weight);

  // --- Graph setup ---
  // FIX: Uncouple the Target slope from the Graph Range
  const goalDurationDays = 60; // Set this to a realistic timeline, not 'range'
  const dailyChange =
    (userProfile.startingWeight - userProfile.targetWeight) / goalDurationDays;

  // FIX: Fallback to currentWeight if weightValues is empty so the app doesn't crash
  const startWeightForLine = weightValues[0] || userProfile.currentWeight;
  const targetLine = filteredLogs.map(
    (_, i) => startWeightForLine - dailyChange * i,
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

  // --- Average Weekly Loss ---
  let avgWeeklyLoss = null;
  if (filteredLogs.length > 1) {
    const start = filteredLogs[0];
    const end = filteredLogs[filteredLogs.length - 1];
    const days =
      (new Date(end.logDate) - new Date(start.logDate)) / (1000 * 60 * 60 * 24);

    if (days > 0) avgWeeklyLoss = ((start.weight - end.weight) / days) * 7;
  }

  const logsThisMonth = Logs.filter((log) => {
    const logDate = new Date(log.logDate);
    const now = new Date();
    return (
      logDate.getMonth() === now.getMonth() &&
      logDate.getFullYear() === now.getFullYear()
    );
  });

  const goalProjection = () => {
    if (!avgWeeklyLoss || avgWeeklyLoss === 0) return null;

    const remainingWeight =
      userProfile.currentWeight - userProfile.targetWeight;
    const projectionDays = remainingWeight / avgWeeklyLoss;

    const projectionDate = new Date();
    projectionDate.setDate(
      projectionDate.getDate() + Math.round(projectionDays),
    );

    // console.log("Projected goal date:", projectionDate);
    return projectionDate;
  };

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
        data: Array(filteredLogs.length).fill(userProfile.targetWeight),
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
    },
  };

  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full h-full py-6 px-4 sm:px-8 gap-8">
      {/* <div className="flex flex-col gap-8 bg-cyan-100 min-h-screen py-6 px-4 sm:px-8"></div> */}
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Weight Progress
        </h1>
        <div className="flex gap-2">
          {[7, 14, 30, 90].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                range === r
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {/* <Button onClick={() => openDialog("edit")} variant="contained">
            <AddIcon className="w-4 h-4" /> Add Weight
          </Button>
          <Button onClick={() => openDialog("edit")} variant="outlined">
            <EditOutlinedIcon className="w-4 h-4" /> Edit
          </Button> */}
          <Button
            onClick={openWeightDialog}
            variant="contained"
            className="flex items-center gap-1"
          >
            <AddIcon className="w-4 h-4" /> Add Weight
          </Button>
        </div>
      </div>

      {/* GRAPH */}
      <div className="bg-cyan-50 rounded-2xl shadow-lg p-4 sm:p-6">
        <div className="h-[320px] sm:h-[420px]">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* STATISTICS */}
      <div className="bg-cyan-50 rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        <h2 className="text-lg font-medium text-gray-700 text-center">
          Statistics
        </h2>

        <Box className="flex flex-col gap-4">
          <BarTracker
            labels={["Progress", "Kg"]}
            progressDate={{
              start: userProfile.startingWeight,
              current: userProfile.currentWeight,
              goal: userProfile.targetWeight,
              percentage: true,
            }}
          />
        </Box>

        <div className="grid grid-cols-3 text-center text-gray-800">
          <div>
            <p className="font-semibold">You Lost</p>
            <p>
              {(userProfile.startingWeight - userProfile.currentWeight).toFixed(
                1,
              )}{" "}
              kg
            </p>
          </div>
          <div>
            <p className="font-semibold">Remaining</p>
            <p>
              {(userProfile.currentWeight - userProfile.targetWeight).toFixed(
                1,
              )}{" "}
              kg
            </p>
          </div>
          <div>
            <p className="font-semibold">Weekly Avg</p>
            <p>
              {avgWeeklyLoss !== null
                ? `${avgWeeklyLoss.toFixed(1)} kg/week`
                : "— kg"}
            </p>
          </div>
        </div>

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

      {/* INSIGHTS */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-pink-100 rounded-xl p-4 shadow text-center">
          <h3 className="font-semibold text-pink-700">🎯 Goal Projection</h3>
          <p className="text-gray-700 mt-2">
            At your current pace, you'll reach your goal around{" "}
            <strong>
              {goalProjection()
                ? goalProjection().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })
                : "—"}
            </strong>
          </p>
        </div>

        <div className="bg-blue-200 rounded-xl p-4 shadow text-center">
          <h3 className="font-semibold text-blue-700">🔥 Consistency</h3>
          <p className="text-gray-700 mt-2">
            Logged{" "}
            <strong>
              {logsThisMonth.length}/{new Date().getDate()} days
            </strong>{" "}
            this month (
            {((logsThisMonth.length / new Date().getDate()) * 100).toFixed(1)}
            %)
          </p>
        </div>

        <div className="bg-yellow-100 rounded-xl p-4 shadow text-center">
          <h3 className="font-semibold text-yellow-700">🏆 Milestone</h3>
          <p className="text-gray-700 mt-2">
            You've lost{" "}
            <strong>
              {(userProfile.startingWeight - userProfile.currentWeight).toFixed(
                1,
              )}{" "}
              kg
            </strong>{" "}
            so far!
          </p>
        </div>
      </div>

      {/* HISTORY TABLE */}
      <div className="bg-cyan-50 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Logs</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Weight (kg)</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {/* FIX: Reverse the array to show Newest first, limit to 10 rows */}
            {[...filteredLogs]
              .reverse()
              .slice(0, 10)
              .map((log, i, arr) => {
                // Because we reversed it, the chronologically older log is the NEXT item (i + 1)
                const olderLog = arr[i + 1];
                const diff = olderLog
                  ? (log.weight - olderLog.weight).toFixed(2)
                  : "0.0";
                const color =
                  diff < 0
                    ? "text-green-600"
                    : diff > 0
                      ? "text-red-500"
                      : "text-gray-600";

                return (
                  <tr key={log.logDate} className="border-b last:border-none">
                    <td className="py-2">
                      {new Date(`${log.logDate}T12:00:00`).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </td>
                    <td>{log.weight.toFixed(2)}</td>
                    <td className={color}>
                      {diff === "0.0" ? "—" : diff > 0 ? `+${diff}` : diff}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className=" hidden">{WeightDialog}</div>
    </div>
  );
}
