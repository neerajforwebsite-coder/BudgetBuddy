// src/components/Reports/Reports.jsx
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

const Reports = () => {
  // ============================
  // FETCH TRANSACTIONS
  // ============================
  const { data: rawData = [], isLoading, isError } = useQuery({
    queryKey: ["reports-transactions"],
    queryFn: listTransactionsAPI,
  });

  // Normalize data (safe types)
  const transactions = useMemo(
    () =>
      (rawData || []).map((t) => ({
        ...t,
        type: (t.type || "").toLowerCase(),
        amount: Number(t.amount || 0),
        date: t.date ? new Date(t.date) : null,
      })),
    [rawData]
  );

  // ============================
  // FILTER STATE
  // ============================
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // "", "income", "expense"

  // ============================
  // APPLY FILTERS
  // ============================
  const filteredTx = useMemo(() => {
    return transactions.filter((t) => {
      if (!t.date) return false;

      // Type filter
      if (typeFilter && t.type !== typeFilter) return false;

      // Start date filter
      if (startDate && t.date < new Date(startDate)) return false;

      // End date filter
      if (endDate && t.date > new Date(endDate)) return false;

      return true;
    });
  }, [transactions, startDate, endDate, typeFilter]);

  // ============================
  // SUMMARY CALCULATION
  // ============================
  const totalIncome = filteredTx
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTx
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const fmt = (n) => n.toLocaleString("en-IN");

  // ============================
  // EXPORT: PDF
  // ============================
  const handleDownloadPDF = () => {
    if (!filteredTx.length) {
      alert("No transactions to export for the selected filters.");
      return;
    }

    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("BudgetBuddy - Transaction Report", 14, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Total Income: ₹${fmt(totalIncome)}`, 14, y);
    y += 6;
    doc.text(`Total Expense: ₹${fmt(totalExpense)}`, 14, y);
    y += 6;
    doc.text(`Balance: ₹${fmt(balance)}`, 14, y);
    y += 10;

    doc.text("Transactions:", 14, y);
    y += 8;

    filteredTx.forEach((t, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      const line = `${index + 1}. ${t.date?.toLocaleDateString()} | ${
        t.type.toUpperCase()
      } | ₹${t.amount} | ${t.category?.name || "No Category"}`;

      doc.text(line, 14, y);
      y += 7;
    });

    doc.save("BudgetBuddy_Report.pdf");
  };

  // ============================
  // EXPORT: CSV
  // ============================
  const handleDownloadCSV = () => {
    if (!filteredTx.length) {
      alert("No transactions to export for the selected filters.");
      return;
    }

    const header = ["Date", "Type", "Category", "Amount", "Description"];
    const rows = filteredTx.map((t) => [
      t.date ? t.date.toISOString().split("T")[0] : "",
      t.type,
      t.category?.name || "No Category",
      t.amount,
      (t.description || "").replace(/,/g, " "), // avoid breaking CSV
    ]);

    const csvContent =
      [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "BudgetBuddy_Report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // ============================
  // RENDER
  // ============================

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-700 dark:text-gray-200">
        Loading reports...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        Failed to load reports. Please try again.
      </div>
    );
  }

  return (
    <div
      className="p-6 max-w-6xl mx-auto 
        text-gray-900 dark:text-gray-100 
        transition-colors duration-300"
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Reports
      </h1>

      {/* Summary + Export sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Summary Card */}
        <div
          className="
          rounded-2xl p-6 shadow 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
        "
        >
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Summary
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Quick overview of income, expense and balance. Use filters below to
            refine the report.
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Total Income
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                ₹{fmt(totalIncome)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Total Expense
              </span>
              <span className="font-medium text-red-600 dark:text-red-400">
                ₹{fmt(totalExpense)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Balance
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                ₹{fmt(balance)}
              </span>
            </div>
          </div>
        </div>

        {/* Export Card */}
        <div
          className="
          rounded-2xl p-6 shadow 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
        "
        >
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Export
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Download the report as PDF or CSV for sharing and printing.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              className="
              px-4 py-2 rounded-lg font-semibold shadow 
              bg-gradient-to-r from-blue-600 to-teal-500 
              text-white
            "
            >
              Download PDF
            </button>

            <button
              onClick={handleDownloadCSV}
              className="
              px-4 py-2 rounded-lg font-semibold 
              bg-gray-200 dark:bg-gray-700 
              text-gray-800 dark:text-gray-200
              border border-gray-300 dark:border-gray-600
            "
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className="
        mt-8 rounded-2xl p-6 shadow
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
      "
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Filters
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="date"
            className="app-input !pl-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="app-input !pl-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <select
            className="app-input !pl-3"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Transactions Info */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Transactions
          </h4>

          {filteredTx.length === 0 ? (
            <div className="text-sm text-gray-500 dark:text-gray-300">
              No transactions matched the filters.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTx.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between text-sm py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <div className="font-medium">
                      {t.category?.name || "No Category"}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {t.date?.toLocaleDateString()} •{" "}
                      {t.description || "No description"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={
                        t.type === "income"
                          ? "text-green-600 dark:text-green-400 font-semibold"
                          : "text-red-600 dark:text-red-400 font-semibold"
                      }
                    >
                      ₹{fmt(t.amount)}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
