import React from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { FiPlus } from "react-icons/fi";
import styles from "./Workers.module.css";

const Workers = () => {
  return (
    <div className={styles.workersPage}>
      <div className={styles.header}>
        <div>
          <h1>Workers</h1>
          <p>Manage your workforce and track their productivity</p>
        </div>
        <Button icon={<FiPlus />}>Add Worker</Button>
      </div>

      <Card>
        <p className={styles.placeholder}>Worker list will appear here</p>
      </Card>
    </div>
  );
};

export default Workers;
