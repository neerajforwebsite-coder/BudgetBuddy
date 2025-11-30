import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TransactionChart = () => {
  const { isLoading, isError, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: listTransactionsAPI,
  });

  if (isError)
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Something went wrong…
      </p>
    );

  if (isLoading)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        Loading chart…
      </p>
    );

  const totals = transactions?.reduce(
    (acc, t) => {
      const type = t?.type?.toLowerCase();
      if (type === "income") acc.income += t.amount;
      if (type === "expense") acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totals.income, totals.expense],
        backgroundColor: ["#1E90FF", "#FF6384"],
        hoverBackgroundColor: ["#1C86EE", "#FF4F70"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#fff" },
      },
      title: { display: false },
    },
    cutout: "60%",
  };

  return (
    <div className="flex justify-center items-center w-full mt-10">
      {/* Medium sized chart */}
      <div
        id="chart-container"
        className="
          p-4 rounded-2xl
          bg-white dark:bg-gray-800
          shadow-lg border border-gray-200 dark:border-gray-700
        "
        style={{
          width: "100%",
          maxWidth: "500px",  // medium size
          height: "500px",    // medium size
        }}
      >
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Ensure legend text is white in dark mode */}
      <style>
        {`
          .dark canvas {
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default TransactionChart;
