import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useQuery } from "@tanstack/react-query";

import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";

import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";

const Dashboard = () => {
  // =============================
  // HOOKS MUST ALWAYS BE ON TOP
  // =============================

  const {
    isLoading: txLoading,
    isError: txError,
    data: transactions = [],
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: listTransactionsAPI,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: listCategoriesAPI,
  });

  // LIMIT + NOTIFICATION HOOKS
  const [limit, setLimit] = useState(
    Number(localStorage.getItem("userLimit")) || 0
  );

  const [showNotification, setShowNotification] = useState(false);

  const saveLimit = () => {
    localStorage.setItem("userLimit", limit);
    alert("Limit updated successfully!");
  };

  // =============================
  // DATA NORMALIZATION
  // =============================

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "N/A";
    const found = categories.find(
      (c) =>
        String(c._id) === String(categoryId) ||
        String(c.id) === String(categoryId)
    );
    return found ? found.name : "Unknown";
  };

  const normalizedTx = (transactions || []).map((t) => ({
    ...t,
    type: (t.type || "").toLowerCase(),
    amount: Number(t.amount || 0),
    date: t.date ? new Date(t.date) : null,
  }));

  const totalIncome = normalizedTx
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = normalizedTx
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // =============================
  // SHOW LIMIT NOTIFICATION — ALWAYS FADE, NEVER HIDE
  // =============================
  useEffect(() => {
    if (!txLoading && !txError) {
      if (limit > 0 && balance <= limit) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
    }
  }, [balance, limit, txLoading, txError]);

  // =============================
  // SAFE LOADING AND ERROR UI
  // =============================

  if (txLoading) {
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        Loading Dashboard...
      </p>
    );
  }

  if (txError) {
    return (
      <p className="text-center text-red-700 dark:text-red-400">
        Error loading dashboard...
      </p>
    );
  }

  // =============================
  // PDF LOGIC (UNCHANGED)
  // =============================

  const categoryMap = {};
  normalizedTx.forEach((t) => {
    const name = getCategoryName(t.category);
    categoryMap[name] = (categoryMap[name] || 0) + t.amount;
  });

  const fmt = (n) => n?.toLocaleString?.() ?? n;

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFillColor(15, 76, 129);
      pdf.rect(0, 0, pageWidth, 28, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.text("BudgetBuddy Report", pageWidth / 2, 18, { align: "center" });

      pdf.save("BudgetBuddy_Report.pdf");
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF.");
    }
  };

  // =============================
  // FINAL UI RENDER
  // =============================

  return (
    <div className="p-6 text-gray-900 dark:text-white">

      {/* NOTIFICATION — Never hides, always fading */}
      {showNotification && (
        <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center font-semibold shadow animate-pulse">
          ⚠ Low Balance Alert! Your remaining balance is ₹{balance}.
        </div>
      )}

      {/* ===== SUMMARY CARDS (PREMIUM STYLE) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

        {/* Income Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-green-600 to-green-700 shadow-lg 
                        border border-green-400/40 hover:scale-[1.02] transition duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-800 rounded-lg shadow-inner">💰</div>
            <div>
              <h3 className="text-sm font-bold text-green-100 tracking-wide">Total Income</h3>
              <p className="text-2xl font-extrabold text-white mt-1">₹ {totalIncome}</p>
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-lg 
                        border border-red-400/40 hover:scale-[1.02] transition duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-800 rounded-lg shadow-inner">💸</div>
            <div>
              <h3 className="text-sm font-bold text-red-100 tracking-wide">Total Expense</h3>
              <p className="text-2xl font-extrabold text-white mt-1">₹ {totalExpense}</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg 
                        border border-blue-400/40 hover:scale-[1.02] transition duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-800 rounded-lg shadow-inner">📊</div>
            <div>
              <h3 className="text-sm font-bold text-blue-100 tracking-wide">Remaining Balance</h3>
              <p className="text-2xl font-extrabold text-white mt-1">₹ {balance}</p>
            </div>
          </div>
        </div>

      </div>

      {/* CLEAN LIMIT CARD */}
      <div className="mb-6 bg-gray-800 border border-gray-700 p-4 rounded-xl shadow w-64">
        <h2 className="font-semibold text-white mb-2 text-sm">Low Balance Limit</h2>

        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="Enter limit (₹)"
          className="no-spinner w-full px-3 py-2 mb-3 rounded-lg bg-gray-900 border border-gray-600 text-white 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />

        <button
          onClick={saveLimit}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          Save Limit
        </button>
      </div>

      <TransactionChart />
      <TransactionList />

      <div className="text-center mt-6">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-[#0f4c81] dark:bg-blue-700 text-white font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
