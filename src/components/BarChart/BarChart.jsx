import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import "./BarChart.css";

import { faker } from "@faker-js/faker";

import { Bar } from "react-chartjs-2";

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const options = {
  elements: {
    bar: {
      borderWidth: 2,
      width: 10,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Average Weekly Temperature",
    },
  },
  barThickness: 40,
};

export const data = {
  labels,
  datasets: [
    {
      label: "Average Temperature",
      data: labels.map(() => faker.datatype.number({ min: 20, max: 50 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const BarChart = () => {
  return (
    <div className="bar-chart">
      <h2>Bar Chart for Average Weekly Temperature</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
