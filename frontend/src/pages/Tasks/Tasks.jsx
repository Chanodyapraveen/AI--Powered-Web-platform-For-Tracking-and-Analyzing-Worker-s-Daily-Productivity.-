import React from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { FiPlus } from "react-icons/fi";

const Tasks = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks</h1>
          <p className="text-gray-600 text-base">
            Track and manage daily tasks
          </p>
        </div>
        <Button icon={<FiPlus />}>Add Task</Button>
      </div>

      <Card>
        <p className="text-gray-600 text-center p-12">
          Task list will appear here
        </p>
      </Card>
    </div>
  );
};

export default Tasks;
