import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardCharts = ({ requestsData, resumesData }) => {
  // Configuration for requests by status chart
  const requestsByStatusData = {
    labels: [
      "Pendientes",
      "En Revisión",
      "Aprobados",
      "Rechazados",
      "Completados",
    ],
    datasets: [
      {
        label: "Cantidad de Trámites",
        data: [15, 8, 12, 5, 10],
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuration for requests by type chart
  const requestsByTypeData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Licencias",
        data: [12, 15, 18, 14, 20, 22],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Permisos",
        data: [8, 10, 12, 9, 11, 13],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Reclamos",
        data: [5, 7, 6, 4, 8, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Options for bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trámites por Mes y Tipo",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Options for doughnut chart
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Trámites por Estado",
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={requestsByTypeData} options={barOptions} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Doughnut data={requestsByStatusData} options={doughnutOptions} />
      </div>
    </div>
  );
};

export default DashboardCharts;
