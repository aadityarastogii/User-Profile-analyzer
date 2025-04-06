import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const DailyCommitsChart: React.FC<{ username: string }> = ({ username }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [] as any[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/events`,
          {
            headers: GITHUB_TOKEN
              ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
              : {},
          }
        );

        const commitsPerDay: Record<string, number> = {};
        response.data
          .filter((event: any) => event.type === "PushEvent")
          .forEach((event: any) => {
            const date = new Date(event.created_at).toLocaleDateString();
            commitsPerDay[date] = (commitsPerDay[date] || 0) + 1;
          });

        if (Object.keys(commitsPerDay).length === 0) {
          throw new Error("No recent commit data found for this user.");
        }

        setChartData({
          labels: Object.keys(commitsPerDay),
          datasets: [
            {
              label: "Daily Commits",
              data: Object.values(commitsPerDay),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        });
      } catch (err: any) {
        console.error("Error fetching commit data:", err.message);
        setError(
          err.message ||
            "Failed to fetch commit data. This user might have no recent public activity."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCommitData();
  }, [username]);

  if (loading) {
    return <p>Loading commit data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h2>Daily Commits Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DailyCommitsChart;
