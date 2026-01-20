import React from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { FiPlus } from 'react-icons/fi';
import styles from './Tasks.module.css';

const Tasks = () => {
  return (
    <div className={styles.tasksPage}>
      <div className={styles.header}>
        <div>
          <h1>Tasks</h1>
          <p>Track and manage daily tasks</p>
        </div>
        <Button icon={<FiPlus />}>Add Task</Button>
      </div>

      <Card>
        <p className={styles.placeholder}>Task list will appear here</p>
      </Card>
    </div>
  );
};

export default Tasks;
