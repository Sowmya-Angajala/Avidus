import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardLayout
from "../layouts/DashboardLayout";

import StatsCard
from "../components/StatsCard";

import {
  useToast
} from "../context/ToastContext";

const Dashboard = () => {

  const { showToast } =
    useToast();

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            "/tasks"
          );

        setTasks(
          res.data.tasks
        );

      } catch (error) {

        showToast(
          "error",
          error.response?.data?.message ||
          "Failed to load dashboard data"
        );

      } finally {

        setLoading(false);

      }

    };

  const completed =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pending =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  return (
    <DashboardLayout>

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Dashboard
      </h1>

      {loading ? (

        <h3>
          Loading...
        </h3>

      ) : (

        <div className="stats-grid">

          <StatsCard
            title="Total Tasks"
            value={tasks.length}
          />

          <StatsCard
            title="Completed"
            value={completed}
          />

          <StatsCard
            title="Pending"
            value={pending}
          />

        </div>

      )}

    </DashboardLayout>
  );
};

export default Dashboard;