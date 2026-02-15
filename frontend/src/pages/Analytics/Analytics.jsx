import React from "react";
import Card from "../../components/common/Card/Card";

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-500 text-base">
          Visualize productivity trends and insights
        </p>
      </div>

      <Card>
        <p className="text-gray-500 text-center py-12">
          Analytics charts and graphs will appear here
        </p>
      </Card>
    </div>
  );
};

export default Analytics;
