import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Select from "react-select";

export default function Investment() {
  const investmentOptions = [
    { value: "Stocks", label: "Stocks" },
    { value: "Crypto", label: "Crypto" },
    { value: "Mutual Funds", label: "Mutual Funds" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Gold", label: "Gold" },
    { value: "Others", label: "Others" },
  ];

  const [investmentList, setInvestmentList] = useState(() => {
    const stored = localStorage.getItem("investments");
    return stored ? JSON.parse(stored) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investmentList));
  }, [investmentList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || selectedTypes.length === 0) return;

    const newInvestment = {
      id: Date.now(),
      title,
      amount: Number(amount),
      types: selectedTypes.map((t) => t.label).join(", "),
      date: date || new Date().toISOString().split("T")[0],
    };

    setInvestmentList([newInvestment, ...investmentList]);
    setTitle("");
    setAmount("");
    setSelectedTypes([]);
    setDate("");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add New Investment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Investment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <Select
            options={investmentOptions}
            value={selectedTypes}
            onChange={setSelectedTypes}
            isMulti
            placeholder="Select Investment Types"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Investment
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Investments</h3>
        {investmentList.length === 0 ? (
          <p className="text-gray-500">No investments added yet.</p>
        ) : (
          <div className="space-y-3">
            {investmentList.map((inv) => (
              <div
                key={inv.id}
                className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:justify-between hover:scale-[1.02] transition"
              >
                <div>
                  <h4 className="font-medium">{inv.title}</h4>
                  <p className="text-gray-600 text-sm">{inv.types}</p>
                  <p className="text-gray-500 text-sm">Date: {inv.date}</p>
                </div>
                <p className="text-green-600 text-lg font-bold mt-2 md:mt-0">
                  ₹ {inv.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
