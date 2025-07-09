import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Transaction() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const [filterType, setFilterType] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    amount: "",
    type: "Expense",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === "All") return true;
    return tx.type === filterType;
  });

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === formData.id ? { ...formData, amount: Number(formData.amount) } : tx))
      );
      setIsEditing(false);
    } else {
      const newTx = {
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount),
      };
      setTransactions([newTx, ...transactions]);
    }
    setFormData({ id: null, title: "", amount: "", type: "Expense", date: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleEdit = (tx) => {
    setFormData(tx);
    setShowForm(true);
    setIsEditing(true);
  };

  return (
    <Layout>
      <h1 className="text-xl mb-4 font-bold text-gray-800">Transactions</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="text-gray-700">Total Transactions: {transactions.length}</p>
        <p className="text-gray-700">Total Amount: ₹ {totalAmount.toLocaleString()}</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <label className="mr-2 text-gray-700 font-medium">Filter by type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setFormData({ id: null, title: "", amount: "", type: "Expense", date: "" });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + New Transaction
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleAddOrUpdate}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-1 md:col-span-2"
            >
              {isEditing ? "Update Transaction" : "Add Transaction"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center hover:scale-[1.02] transition"
          >
            <div>
              <p className="font-medium">{tx.title}</p>
              <p className="text-gray-500 text-sm">{tx.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p
                className={`text-lg font-bold ${
                  tx.type === "Expense" ? "text-red-500" : "text-green-600"
                }`}
              >
                ₹ {tx.amount.toLocaleString()}
              </p>
              <button onClick={() => handleEdit(tx)} className="text-yellow-500">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(tx.id)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
