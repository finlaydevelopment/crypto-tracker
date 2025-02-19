"use client";

import { Line } from "react-chartjs-2";
import { fetchChartData } from "../utils/api";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

export default function CryptoChart({ coinId = "bitcoin" }) {  // Default to Bitcoin
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchChartData(coinId);
        setChartData(data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    getData();
  }, [coinId]);

  return (
    <div style={{ maxWidth: '1500px', minHeight: '500px',maxHeight: '800px', margin: 'auto' }}>
        <Line
        data={{
            labels: chartData.map((data) => new Date(data[0]).toLocaleDateString()),
            datasets: [
            {
                label: "Price (£)",
                data: chartData.map((data) => data[1]),
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
            ],
        }}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
            x: {
                type: "category",
            },
            y: {
                beginAtZero: false,
            },
            },
        }}
        />
    </div>
  );
}
