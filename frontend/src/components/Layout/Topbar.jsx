// src/components/Layout/Topbar.jsx
import React, { useContext } from "react";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../../context/ThemeContext"; // ⭐ Global Theme

const Topbar = () => {
  // ⭐ Fetch theme + toggle from global context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className="
        w-full h-20 
        bg-white dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
        shadow-sm 
        px-6 flex items-center justify-between
        fixed top-0 left-0 z-40
        text-gray-900 dark:text-gray-100
        transition-colors
      "
    >
      {/* Left Side */}
      <h2 className="text-xl font-semibold text-slate-800 dark:text-gray-100">
        Welcome Back 👋
      </h2>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* ⭐ Global Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="
            p-2 rounded-xl 
            bg-gray-200 dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            shadow-md hover:shadow-lg 
            transition
          "
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </motion.button>

        {/* Notification Bell */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="relative cursor-pointer"
        >
          <FaBell className="text-gray-600 dark:text-gray-300 text-xl" />
          <span
            className="
              absolute -top-1 -right-1 
              bg-red-500 text-white text-xs 
              w-4 h-4 flex items-center justify-center 
              rounded-full
            "
          >
            1
          </span>
        </motion.div>

        {/* User Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="user"
            className="
              w-10 h-10 rounded-full shadow-sm 
              border border-gray-300 dark:border-gray-600
            "
          />
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-gray-100">
              Neeraj
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MCA Student
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Topbar;
