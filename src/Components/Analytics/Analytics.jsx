import React from "react";
import "./Analytics.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const data = [
    { name: "Completed", value: 55 },
    { name: "Pending", value: 45 },
  ];

  const COLORS = ["#0f766e", "#9f1239"]; // Teal & Purple

  return (
    <div className="analytics-section">
      <h1 className="analytics-heading">
        Task Completion Analytics 📊
      </h1>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;