import React from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { FiPlus } from "react-icons/fi";

const Workers = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Workers</h1>
          <p className="text-gray-500 text-base">Manage your workforce and track their productivity</p>
        </div>
        <Button icon={<FiPlus />}>Add Worker</Button>
      </div>

      <Card>
        <p className="text-gray-500 text-center py-12">Worker list will appear here</p>
      </Card>
    </div>
  );
};

export default Workers;
