import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
  FaTags,
  FaChevronDown,
} from "react-icons/fa";

import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";

// Validation Schema
const validationSchema = Yup.object({
  type: Yup.string().required("Transaction type is required"),
  amount: Yup.number().required("Amount is required").positive(),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const CustomDropdown = ({ label, icon, value, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label className="block font-semibold mb-2 text-gray-200">
        {icon} {label}
      </label>

      <div
        className="
          bg-gray-800/40 text-gray-100 border border-gray-700/70
          backdrop-blur-md px-4 py-3 rounded-xl cursor-pointer
          flex justify-between items-center
          hover:border-cyan-400 transition
        "
        onClick={() => setOpen(!open)}
      >
        <span>{value ? value : `Select ${label}`}</span>
        <FaChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div
          className="
            absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto
            bg-gray-900/95 border border-gray-700/70 rounded-xl shadow-lg z-10
            animate-dropdown
          "
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                px-4 py-3 text-gray-200 hover:bg-gray-700/50
                cursor-pointer transition
              "
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes dropdown {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-dropdown {
            animation: dropdown 0.15s ease-out;
          }
        `}
      </style>
    </div>
  );
};

const TransactionForm = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: addTransactionAPI,
  });

  const { data: categories = [] } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1322] via-[#111a2e] to-[#0c1322] flex justify-center py-12 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="
          w-full max-w-2xl bg-white/10 backdrop-blur-2xl rounded-3xl 
          shadow-2xl border border-white/10 p-10 animate-formFade
          text-gray-100
        "
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Add Transaction
        </h1>
        <p className="text-center text-gray-300 mt-2 mb-10">
          Track everything smoothly ✨
        </p>

        {/* Alerts */}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Something went wrong"}
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Transaction added!" />
        )}

        <div className="space-y-6">
          {/* Custom Dropdown: Type */}
          <CustomDropdown
            label="Transaction Type"
            icon={<FaWallet className="inline-block mr-2 text-cyan-400" />}
            value={formik.values.type}
            onChange={(val) => formik.setFieldValue("type", val)}
            options={[
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-400 text-sm">{formik.errors.type}</p>
          )}

          {/* Amount */}
          <div>
            <label className="block font-semibold mb-2 text-gray-200">
              Amount
            </label>
            <input
              type="number"
              {...formik.getFieldProps("amount")}
              placeholder="Enter amount"
              className="
                w-full px-4 py-3 rounded-xl bg-gray-800/40
                border border-gray-700/70 backdrop-blur-lg text-gray-100
                focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none
              "
            />
            {formik.errors.amount && formik.touched.amount && (
              <p className="text-red-400 text-sm">{formik.errors.amount}</p>
            )}
          </div>

          {/* Custom Dropdown: Category */}
          <CustomDropdown
            label="Category"
            icon={<FaTags className="inline-block mr-2 text-cyan-400" />}
            value={formik.values.category}
            onChange={(val) => formik.setFieldValue("category", val)}
            options={categories.map((c) => ({
              value: c.name,
              label: c.name,
            }))}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-400 text-sm">{formik.errors.category}</p>
          )}

          {/* Date */}
          <div>
            <label className="block font-semibold mb-2 text-gray-200">
              <FaCalendarAlt className="inline-block mr-2 text-cyan-400" />
              Date
            </label>
            <input
              type="date"
              {...formik.getFieldProps("date")}
              className="
                w-full px-4 py-3 rounded-xl bg-gray-800/40
                border border-gray-700/70 backdrop-blur-lg text-gray-100
                focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none
              "
            />
            {formik.errors.date && formik.touched.date && (
              <p className="text-red-400 text-sm">{formik.errors.date}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2 text-gray-200">
              <FaRegCommentDots className="inline-block mr-2 text-cyan-400" />
              Description (Optional)
            </label>
            <textarea
              {...formik.getFieldProps("description")}
              placeholder="Write a short note..."
              className="
                w-full px-4 py-3 rounded-xl bg-gray-800/40
                border border-gray-700/70 backdrop-blur-lg text-gray-100
                focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none
              "
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full mt-10 py-3 rounded-xl
            bg-gradient-to-r from-cyan-400 to-blue-500
            hover:from-blue-500 hover:to-cyan-400
            text-gray-900 font-semibold text-lg shadow-xl
            transition transform hover:scale-[1.03]
          "
        >
          {isPending ? "Saving..." : "Save Transaction"}
        </button>
      </form>

      <style>
        {`
          @keyframes formFade {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default TransactionForm;
