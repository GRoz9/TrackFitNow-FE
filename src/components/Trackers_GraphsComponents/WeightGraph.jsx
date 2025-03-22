import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export const WeightGraph = (props) => {
  return <Line data={props.data} />;
};
