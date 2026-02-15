import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card/Card";
import Loader from "../../components/common/Loader/Loader";
import { FiUsers, FiCheckCircle, FiClock, FiTrendingUp } from "react-icons/fi";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeTasks: 0,
    completedToday: 0,
    productivity: 0,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalWorkers: 45,
        activeTasks: 128,
        completedToday: 67,
        productivity: 85,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  const statsCards = [
    {
      title: "Total Workers",
      value: stats.totalWorkers,
      icon: <FiUsers />,
      color: "#4f46e5",
    },
    {
      title: "Active Tasks",
      value: stats.activeTasks,
      icon: <FiClock />,
      color: "#f59e0b",
    },
    {
      title: "Completed Today",
      value: stats.completedToday,
      icon: <FiCheckCircle />,
      color: "#10b981",
    },
    {
      title: "Productivity",
      value: `${stats.productivity}%`,
      icon: <FiTrendingUp />,
      color: "#3b82f6",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-base">
          Welcome back! Here's your productivity overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h2 className="text-3xl font-bold text-gray-900 m-0">
                  {stat.value}
                </h2>
              </div>
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activities" className="">
          <p className="text-gray-600 text-center p-8">
            Recent activities will appear here
          </p>
        </Card>

        <Card title="Quick Actions" className="">
          <p className="text-gray-600 text-center p-8">
            Quick action buttons will appear here
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
