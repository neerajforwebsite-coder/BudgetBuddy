import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaWallet, FaTags, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/transactions", label: "Transactions", icon: <FaWallet /> },
  { to: "/categories", label: "Categories", icon: <FaTags /> },
  { to: "/reports", label: "Reports", icon: <FaFileAlt /> },
];

const Sidebar = () => {
  return (
    <aside
      className="
        w-64 min-h-screen 
        bg-white dark:bg-gray-800 
        shadow-lg border-r 
        border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
        transition-colors
      "
    >
      {/* Logo Section */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div
          className="
            w-11 h-11 rounded-2xl 
            bg-gradient-to-br from-blue-600 to-teal-400 
            flex items-center justify-center 
            text-white font-bold shadow-md
          "
        >
          BB
        </div>

        <div>
          <h1 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
            BudgetBuddy
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Personal Finance
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `
              group flex items-center gap-3 px-4 py-3 rounded-xl mb-2 
              transition-all duration-300
              ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              `
            }
          >
            <motion.span
              initial={{ x: -6, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="text-lg"
            >
              {item.icon}
            </motion.span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer box removed completely */}
    </aside>
  );
};

export default Sidebar;
