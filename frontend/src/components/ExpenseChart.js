import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#4f46e5", "#0ea5e9", "#22c55e", "#f97316"];

const ExpenseChart = ({ expenses }) => {
  const totals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const chartData = Object.entries(totals).map(([name, value]) => ({ name, value }));

  if (!chartData.length) {
    return <p className="empty-text">Add expenses to see the chart.</p>;
  }

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label>
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {chartData.map((item, index) => (
          <span key={item.name}>
            <i style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            {item.name}: ${item.value.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
