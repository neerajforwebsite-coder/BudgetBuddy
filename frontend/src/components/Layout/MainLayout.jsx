import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children }) => {
  return (
    <div
      className="
        flex h-screen 
        bg-gray-100 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />

        <div
          className="
            p-6 
            min-h-screen
            bg-gray-100 dark:bg-gray-900
            transition-colors duration-300
          "
        >
          {/* Render inner pages */}
          {children ? children : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
