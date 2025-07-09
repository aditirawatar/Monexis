import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyComparison() {
  const lastMonth = {
    income: 50000,
    expenses: 35000,
  };

  const currentMonth = {
    income: 55000,
    expenses: 42000,
  };

  const data = [
    {
      name: "Income",
      "Last Month": lastMonth.income,
      "Current Month": currentMonth.income,
    },
    {
      name: "Expenses",
      "Last Month": lastMonth.expenses,
      "Current Month": currentMonth.expenses,
    },
  ];

  const incomeDiff = currentMonth.income - lastMonth.income;
  const expenseDiff = currentMonth.expenses - lastMonth.expenses;

  const incomeChangePercent = ((incomeDiff) / lastMonth.income) * 100;
  const expenseChangePercent = ((expenseDiff) / lastMonth.expenses) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-gray-700 font-bold mb-4">Monthly Comparison & Insights</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Last Month" fill="#3B82F6" />
            <Bar dataKey="Current Month" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <p className={incomeDiff >= 0 ? "text-green-600" : "text-red-600"}>
          Income {incomeDiff >= 0 ? "increased" : "decreased"} by {Math.abs(incomeChangePercent).toFixed(2)}% compared to last month.
        </p>
        <p className={expenseDiff >= 0 ? "text-red-600" : "text-green-600"}>
          Expenses {expenseDiff >= 0 ? "increased" : "decreased"} by {Math.abs(expenseChangePercent).toFixed(2)}% compared to last month.
        </p>
        {expenseDiff > 0 ? (
          <p className="text-yellow-600 mt-1">⚠️ Consider reducing your expenses next month.</p>
        ) : (
          <p className="text-green-600 mt-1">✅ Great job controlling your expenses!</p>
        )}
      </div>
    </div>
  );
}
