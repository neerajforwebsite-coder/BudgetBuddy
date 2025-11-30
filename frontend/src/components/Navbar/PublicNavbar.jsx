// src/components/Navbar/PublicNavbar.jsx
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function PublicNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Disclosure
      as="nav"
      className="
        bg-gradient-to-r from-[#0f172a] to-[#0a1120]   /* ⬅ updated color */
        text-white 
        backdrop-blur-xl 
        shadow-lg 
        fixed top-0 left-0 w-full z-50
        border-b border-gray-800
      "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex h-16 justify-between items-center">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-extrabold text-xl">B</span>
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight">
                  BudgetBuddy
                </h1>
              </Link>

              {/* Desktop */}
              <div className="hidden md:flex gap-4 items-center">

                {/* THEME TOGGLE */}
                <button
                  onClick={toggleTheme}
                  className="
                    p-2 rounded-lg 
                    bg-gray-800 dark:bg-gray-700 
                    text-gray-200 dark:text-gray-100
                    hover:bg-gray-700 dark:hover:bg-gray-600 
                    transition border border-gray-700
                  "
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>

                <Link to="/register">
                  <button className="px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition-all">
                    Register
                  </button>
                </Link>

                <Link to="/login">
                  <button className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-all">
                    Login
                  </button>
                </Link>
              </div>

              {/* Mobile Hamburger */}
              <div className="flex md:hidden">
                <Disclosure.Button
                  className="
                    p-2 rounded-md 
                    text-gray-200 
                    hover:bg-gray-800 
                    transition
                  "
                >
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden bg-gradient-to-r from-[#0f172a] to-[#0a1120] text-white shadow-xl border-b border-gray-800">
            <div className="space-y-1 px-4 pt-2 pb-3">

              {/* Toggle */}
              <button
                onClick={toggleTheme}
                className="
                  w-full flex items-center gap-2 
                  px-3 py-2 rounded-md 
                  bg-gray-800 dark:bg-gray-700 text-white
                  mb-2 border border-gray-700
                "
              >
                {theme === "dark" ? (
                  <>
                    <SunIcon className="h-5 w-5" /> Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5" /> Dark Mode
                  </>
                )}
              </button>

              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="
                    block w-full text-left 
                    px-3 py-2 rounded-md 
                    text-white font-medium 
                    hover:bg-gray-800
                  "
                >
                  Home
                </Disclosure.Button>
              </Link>

              <Link to="/register">
                <Disclosure.Button
                  as="button"
                  className="
                    block w-full text-left 
                    px-3 py-2 rounded-md 
                    text-white font-medium 
                    hover:bg-gray-800
                  "
                >
                  Register
                </Disclosure.Button>
              </Link>

              <Link to="/login">
                <Disclosure.Button
                  as="button"
                  className="
                    block w-full text-left 
                    px-3 py-2 rounded-md 
                    text-white font-medium 
                    hover:bg-gray-800
                  "
                >
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
