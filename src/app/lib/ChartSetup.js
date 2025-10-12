"use client";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Prevent double registration (Next.js hot reload will otherwise do it twice)
let isRegistered = false;

export function useChartSetup() {
  if (!isRegistered && typeof window !== "undefined") {
    ChartJS.register(
      LineElement,
      BarElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Title,
      Tooltip,
      Legend,
      Filler
    );
    console.log("✅ Chart.js elements registered");
    isRegistered = true;
  }
}
