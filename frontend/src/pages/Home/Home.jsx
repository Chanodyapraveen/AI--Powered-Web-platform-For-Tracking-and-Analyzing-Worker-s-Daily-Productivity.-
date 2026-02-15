import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button/Button";
import { FiUser, FiTrendingUp, FiUsers, FiPackage } from "react-icons/fi";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const stats = [
    {
      value: "120+",
      label: "Active Fields",
      icon: <FiPackage />,
    },
    {
      value: "1,500+",
      label: "Workers Managed",
      icon: <FiUsers />,
    },
    {
      value: "8,200+",
      label: "Daily Harvest (kg)",
      icon: <FiTrendingUp />,
    },
    {
      value: "7",
      label: "Factories Linked",
      icon: <FiPackage />,
    },
  ];

  return (
    <div className={styles.homePage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>🍃</div>
            <span className={styles.logoText}>CeylonLeaf</span>
          </div>
          <Button
            variant="outline"
            onClick={handleLogin}
            icon={<FiUser />}
            className={styles.headerButton}
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>🍃</div>
          <h1 className={styles.heroTitle}>CeylonLeaf</h1>
          <p className={styles.heroSubtitle}>
            Smart tools for tea estates — from field planning and worker
            management to{" "}
            <span className={styles.highlight}>harvest tracking</span> and
            seamless handover to the factory.
          </p>
          <div className={styles.heroActionContainer}>
            <Button variant="primary" size="large" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
