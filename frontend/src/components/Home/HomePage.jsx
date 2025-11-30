// src/components/Home/HomePage.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaChartPie,
  FaCheckCircle,
  FaShieldAlt,
  FaHistory,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br from-blue-50 to-teal-50
      dark:from-gray-900 dark:to-gray-800
      flex flex-col items-center justify-start
      px-4 py-24
      text-gray-900 dark:text-white
    "
    >
      {/* MAIN HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
        max-w-5xl w-full flex flex-col md:flex-row items-center gap-10
        bg-white/30 dark:bg-gray-800/40
        backdrop-blur-xl shadow-xl rounded-3xl p-10
        border border-white/40 dark:border-gray-700
      "
      >
        
        {/* LEFT SIDE TEXT */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h1
            className="
            text-5xl font-extrabold
            bg-gradient-to-r from-blue-600 to-teal-600
            dark:from-teal-400 dark:to-blue-400
            text-transparent bg-clip-text
          "
          >
            Manage Your Money Smartly
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            BudgetBuddy helps you track expenses, analyze spending patterns,
            manage budgets, and stay financially organized — all in one place.
          </p>

          {/* QUICK FEATURES */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
              <FaCheckCircle className="text-teal-600 dark:text-teal-400 text-xl" />
              <span>Track Income & Expenses Easily</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
              <FaCheckCircle className="text-teal-600 dark:text-teal-400 text-xl" />
              <span>Get Smart Reports & Visual Charts</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
              <FaCheckCircle className="text-teal-600 dark:text-teal-400 text-xl" />
              <span>Create Categories to Organize Spending</span>
            </div>
          </div>

          {/* CTA BUTTON */}
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="
              mt-8 px-8 py-3 text-lg font-semibold text-white
              rounded-xl bg-gradient-to-r from-blue-500 to-teal-500
              dark:from-teal-500 dark:to-blue-500 shadow-lg
            "
            >
              Create Free Account
            </motion.button>
          </Link>
        </motion.div>

        {/* RIGHT SIDE GRAPHIC */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex items-center justify-center"
        >
          <div
            className="
            relative w-64 h-64
            bg-white/40 dark:bg-gray-700/40
            backdrop-blur-xl rounded-full shadow-2xl
            flex items-center justify-center
          "
          >
            <FaChartPie className="text-blue-600 dark:text-blue-400 text-7xl" />
          </div>
        </motion.div>
      </motion.div>

      {/* FEATURES SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-20 max-w-5xl w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose BudgetBuddy?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1 */}
          <div
            className="
            bg-white/30 dark:bg-gray-800/40
            p-6 rounded-2xl shadow-lg backdrop-blur-xl
            border border-white/40 dark:border-gray-700
            text-center
          "
          >
            <FaWallet className="text-4xl text-blue-600 dark:text-blue-400 mx-auto" />
            <h3 className="mt-4 font-semibold text-xl">Simple to Use</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Quickly add transactions, categorize your spending, and monitor
              your money flow effortlessly.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="
            bg-white/30 dark:bg-gray-800/40
            p-6 rounded-2xl shadow-lg backdrop-blur-xl
            border border-white/40 dark:border-gray-700
            text-center
          "
          >
            <FaHistory className="text-4xl text-teal-600 dark:text-teal-400 mx-auto" />
            <h3 className="mt-4 font-semibold text-xl">Full History</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Access all your past transactions anytime — nothing gets lost.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="
            bg-white/30 dark:bg-gray-800/40
            p-6 rounded-2xl shadow-lg backdrop-blur-xl
            border border-white/40 dark:border-gray-700
            text-center
          "
          >
            <FaShieldAlt className="text-4xl text-purple-600 dark:text-purple-400 mx-auto" />
            <h3 className="mt-4 font-semibold text-xl">Secure & Private</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your financial data is encrypted and stored safely in the cloud.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ❌ REMOVED (Use It Anywhere Section)
      
      <motion.div ...>
        <FaMobileAlt ... />
        <h2>Use It Anywhere</h2>
        <p>...</p>
      </motion.div>
      
      */}
    </div>
  );
};

export default HomePage;
