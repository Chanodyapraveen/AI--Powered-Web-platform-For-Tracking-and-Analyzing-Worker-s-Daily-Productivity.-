import React from "react";
import Card from "../../components/common/Card/Card";
import styles from "./Analytics.module.css";

const Analytics = () => {
  return (
    <div className={styles.analyticsPage}>
      <div className={styles.header}>
        <h1>Analytics</h1>
        <p>Visualize productivity trends and insights</p>
      </div>

      <Card>
        <p className={styles.placeholder}>
          Analytics charts and graphs will appear here
        </p>
      </Card>
    </div>
  );
};

export default Analytics;
