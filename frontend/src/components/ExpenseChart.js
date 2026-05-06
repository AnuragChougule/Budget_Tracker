import React, { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Colors that match your FinancePulse dark theme
const COLORS = ["#7c6ef7", "#4ade80", "#fbbf24", "#60a5fa", "#f87171"];

const ExpenseChart = ({ expenses }) => {
  // Aggregate data by category
  const totals = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category || "Others";
      acc[category] = (acc[category] || 0) + Number(expense.amount);
      return acc;
    }, {});
  }, [expenses]);

  const chartData = useMemo(() => 
    Object.entries(totals).map(([name, value]) => ({ name, value })), 
  [totals]);

  if (chartData.length === 0) {
    return (
      <div className="empty-state">
        <p>No expense data to visualize yet.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            cornerRadius={6}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161b27', 
              borderColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              color: '#e8eaf0' 
            }}
            formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
          />
          <Legend wrapperStyle={{ color: '#c4c9d8', fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;