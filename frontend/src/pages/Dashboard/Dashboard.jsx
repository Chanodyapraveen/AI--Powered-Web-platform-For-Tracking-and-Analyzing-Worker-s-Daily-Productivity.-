import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import Loader from '../../components/common/Loader/Loader';
import { FiUsers, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeTasks: 0,
    completedToday: 0,
    productivity: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalWorkers: 45,
        activeTasks: 128,
        completedToday: 67,
        productivity: 85
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  const statsCards = [
    {
      title: 'Total Workers',
      value: stats.totalWorkers,
      icon: <FiUsers />,
      color: '#4f46e5'
    },
    {
      title: 'Active Tasks',
      value: stats.activeTasks,
      icon: <FiClock />,
      color: '#f59e0b'
    },
    {
      title: 'Completed Today',
      value: stats.completedToday,
      icon: <FiCheckCircle />,
      color: '#10b981'
    },
    {
      title: 'Productivity',
      value: `${stats.productivity}%`,
      icon: <FiTrendingUp />,
      color: '#3b82f6'
    }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your productivity overview</p>
      </div>

      <div className={styles.statsGrid}>
        {statsCards.map((stat, index) => (
          <Card key={index} className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statTitle}>{stat.title}</p>
                <h2 className={styles.statValue}>{stat.value}</h2>
              </div>
              <div 
                className={styles.statIcon} 
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.contentGrid}>
        <Card title="Recent Activities" className={styles.activityCard}>
          <p className={styles.placeholder}>Recent activities will appear here</p>
        </Card>

        <Card title="Quick Actions" className={styles.actionsCard}>
          <p className={styles.placeholder}>Quick action buttons will appear here</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
