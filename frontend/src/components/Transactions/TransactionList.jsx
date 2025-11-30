import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionService";
import { FaRegCalendarAlt, FaTags, FaRupeeSign, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TransactionList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["list-transactions"],
    queryFn: listTransactionsAPI,
  });

  // DELETE MUTATION
  const deleteMutation = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      alert("Transaction deleted successfully!");
      queryClient.invalidateQueries(["list-transactions"]);
    },
    onError: (err) => {
      alert(err.message || "Failed to delete the transaction");
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br from-blue-100 via-indigo-50 to-teal-100 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        flex justify-center py-14 px-4
        text-gray-900 dark:text-gray-100
      "
    >
      <div
        className="
          w-full max-w-4xl
          bg-white/70 dark:bg-gray-800/70
          backdrop-blur-xl 
          shadow-xl rounded-3xl 
          p-8 
          border border-white/30 dark:border-gray-700
          animate-fadeSlide
        "
      >
        {/* Header */}
        <h2
          className="
            text-3xl font-extrabold text-center mb-6
            bg-gradient-to-r from-indigo-600 to-blue-600
            dark:from-indigo-400 dark:to-blue-400
            bg-clip-text text-transparent
          "
        >
          Your Transactions
        </h2>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-600 dark:text-gray-300 py-6">
            Loading...
          </p>
        )}

        {/* Empty State */}
        {!isLoading && data?.length === 0 && (
          <div
            className="
              text-center py-12
              bg-white/50 dark:bg-gray-700/50 
              rounded-2xl 
              border border-gray-200 dark:border-gray-600
              shadow-inner
            "
          >
            <p className="text-xl font-semibold mb-2">No Transactions Found</p>
            <p className="text-gray-500 dark:text-gray-300">
              Add your first transaction to start tracking.
            </p>
          </div>
        )}

        {/* List */}
        <div className="mt-4 space-y-4">
          {data?.map((tx) => (
            <div
              key={tx._id}
              className="
                p-5 rounded-2xl shadow-md 
                bg-white/80 dark:bg-gray-800/90 
                backdrop-blur-lg
                border border-gray-200 dark:border-gray-600
                hover:scale-[1.02] transition-all duration-300
                hover:shadow-xl
                flex justify-between items-center
              "
            >
              {/* LEFT CONTENT */}
              <div>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <FaTags className="text-indigo-500 dark:text-indigo-300" />
                  {tx.category?.name || "No Category"}
                </p>

                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                  <FaRegCalendarAlt className="text-indigo-400 dark:text-indigo-300" />
                  {new Date(tx.date).toLocaleDateString()}
                </p>

                {tx.description && (
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm italic">
                    {tx.description}
                  </p>
                )}
              </div>

              {/* RIGHT CONTENT */}
              <div className="text-right">
                <p
                  className={`
                    text-xl font-extrabold flex items-center gap-1 justify-end
                    ${
                      tx.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }
                  `}
                >
                  <FaRupeeSign />
                  {tx.amount}
                </p>

                <span
                  className={`
                    px-3 py-1 text-sm rounded-full
                    ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }
                  `}
                >
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </span>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 mt-4 justify-end">
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => navigate(`/edit-transaction/${tx._id}`)}
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeSlide {
            animation: fadeSlide 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default TransactionList;
