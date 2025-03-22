"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ProteinIntake = () => {
  const bmiChartRef = useRef(null);
  const proteinChartRef = useRef(null);

  useEffect(() => {
    // BMI Chart (Semi-circle)
    const bmiCtx = bmiChartRef.current.getContext("2d");
    new Chart(bmiCtx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [76, 24],
            backgroundColor: ["#4da8f0", "#d3d3d3"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        rotation: -90,
        circumference: 180,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });

    // Protein Goal Chart (Full Circle)
    const proteinCtx = proteinChartRef.current.getContext("2d");
    new Chart(proteinCtx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [75, 25],
            backgroundColor: ["#4da8f0", "#d3d3d3"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 p-4">
      <div className="w-60">
        <h2 className="text-center text-xl font-bold mb-2">BMI Chart</h2>
        <canvas ref={bmiChartRef}></canvas>
        <p className="text-center text-lg font-semibold mt-2">76%</p>
      </div>

      <div className="w-60 relative">
        <h2 className="text-center text-xl font-bold mb-2">Protein Goal</h2>
        <canvas ref={proteinChartRef}></canvas>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          75%
        </div>
      </div>
    </div>
  );
};

export default ProteinIntake;
