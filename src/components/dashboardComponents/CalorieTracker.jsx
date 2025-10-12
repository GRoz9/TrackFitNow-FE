"use client";
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";

export const CalorieTracker = (props) => {
  console.log("Cal", props);
  const weeklyLogs = props.weeklyLogs || [];
  const filteredLogs = weeklyLogs.filter((log) => log.calories > 0);

  const labels = filteredLogs.map((log) => {
    const date = new Date(log.logDate);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
    });
  });

  const calorieValues = filteredLogs.map((log) => log.calories);

  const validCalories = calorieValues.filter((v) => v > 0);
  const avgIntake = validCalories.length
    ? (
        validCalories.reduce((sum, v) => sum + v, 0) / validCalories.length
      ).toFixed(0)
    : 0;

  const dailyTarget = (
    props.maintenance *
    (1 - 0.11 * Number(props.weightLossLevel))
  ).toFixed(0);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Calories",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: calorieValues,
        },
        {
          label: `Goal`,
          backgroundColor: "rgba(75, 192, 192, 0.3)", // soft teal overlay
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 2,
          data: Array(filteredLogs.length).fill(dailyTarget),
        },
      ],
    }),
    [labels, calorieValues, dailyTarget, filteredLogs.length]
  );

  const calories = calorieValues.filter((c) => c > 0);
  let maxCalories = Math.max(...calories, dailyTarget || 2000);
  maxCalories = Math.ceil((maxCalories * 1.1) / 100) * 100;

  return (
    <div className="flex justify-evenly bg-cyan-100 drop-shadow-xl rounded-2xl h-3/4 p-3 sm:p-4 gap-6 max-lg:justify-center">
      {/* <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full h-full p-3 sm:p-4 gap-6"></div> */}
      <div className="flex flex-col justify-between max-sm:w-full max-lg:w-3/4 lg:w-full">
        <Bar
          data={{
            ...data,
            labels: [...data.labels].reverse(),
            datasets: data.datasets.map((ds) => ({
              ...ds,
              data: [...ds.data].reverse(),
            })),
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              // title: {
              //   display: true,
              //   text: "Weekly Calorie Intake",
              // },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                titleFont: { size: 14, weight: "bold" },
                bodyFont: { size: 13 },
                callbacks: {
                  title: (context) => {
                    // The label from your x-axis (e.g. "Mon 6")
                    return `${context[0].label}`;
                  },
                  label: (context) => {
                    // Just show the dataset name (no numbers)
                    const value = context.parsed.y || 0;
                    return `${context.dataset.label}: ${value}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: maxCalories,
                ticks: { stepSize: 500 },
                grid: {
                  color: "rgba(0,0,0,0.1)",
                },
              },
              x: {
                grid: { display: false },
              },
            },
          }}
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-between text-center text-sm sm:text-base mt-4">
            <div className="flex-1 min-w-[100px]">
              <p className="font-medium">Avg Intake</p>
              <p>{avgIntake} Kcal</p>
            </div>
            <div className="flex-1 min-w-[100px]">
              <p className="font-medium">Daily Target</p>
              <p>{dailyTarget} Kcal</p>
            </div>
            <div className="flex-1 min-w-[100px]">
              <p className="font-medium">Maintenance</p>
              <p>{props.maintenance} Kcal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
