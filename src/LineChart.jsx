import React from "react";
import { Line } from "react-chartjs-2";
import './ChartCard.css';

function LineChart({ chartData, chartOptions }) {
  return (
    <div id="Card">
      <h2 style={{ textAlign: "center", color:"white" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default LineChart;
