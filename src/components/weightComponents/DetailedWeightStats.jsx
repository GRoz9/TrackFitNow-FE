import React from "react";
import { WeightGraph } from "../Trackers_GraphsComponents/WeightGraph";

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
        95, 94.2, 93.4, 92.6, 91.8, 91, 90.2, 89.4, 88.6, 87.8, 87, 86.2, 85.5,
        85,
      ],
      borderColor: "red",
      borderDash: [5, 5],
      fill: false,
      tension: 0.2,
    },
  ],
};

export const DetailedWeightStats = () => {
  return (
    <div>
      DetailedWeightStats
      <WeightGraph data={data} />
    </div>
  );
};
