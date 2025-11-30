// src/components/Navbar/PrivateNavbar.jsx
import { Fragment, useContext } from "react";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutAction } from "../../redux/slice/authSlice";
import { ThemeContext } from "../../context/ThemeContext"; // ⭐ GLOBAL THEME

export default function PrivateNavbar() {
  const dispatch = useDispatch();

  // ⭐ use global theme state
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure
      as="nav"
      className="
        bg-white/40 dark:bg-gray-900/40 
        dark:text-white 
        backdrop-blur-2xl 
        shadow-xl 
        fixed top-0 left-0 w-full z-50 
        border-b border-white/30 dark:border-gray-700 
        animate-fadeInSlow
      "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* LOGO */}
              <Link
                to="/"
                className="flex items-center gap-3 group cursor-pointer select-none"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-extrabold text-xl">B</span>
                </div>

                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent tracking-widest drop-shadow-md group-hover:tracking-[2px] transition-all duration-300">
                  BudgetBuddy
                </h1>
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex md:space-x-10 items-center">
                {[
                  { label: "Add Transaction", link: "/add-transaction" },
                  { label: "Add Category", link: "/add-category" },
                  { label: "Categories", link: "/categories" },
                  { label: "Profile", link: "/profile" },
                  { label: "Dashboard", link: "/dashboard" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.link}
                    className="
                      text-gray-700 dark:text-gray-200 
                      font-semibold relative pb-1 
                      hover:text-blue-600 dark:hover:text-blue-400 
                      transition duration-300 group
                    "
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}

                {/* ⭐ GLOBAL THEME TOGGLE */}
                <button
                  onClick={toggleTheme}
                  className="
                    p-2 rounded-xl 
                    bg-gray-200 dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    shadow hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition
                  "
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* DESKTOP LOGOUT */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={logoutHandler}
                  className="
                    flex items-center gap-2 
                    bg-gradient-to-r from-red-500 to-red-700 
                    hover:from-red-600 hover:to-red-800 
                    text-white font-semibold px-5 py-2 rounded-xl 
                    shadow-xl transition-all duration-300 active:scale-95
                  "
                >
                  <IoLogOutOutline className="text-lg" /> Logout
                </button>
              </div>

              {/* MOBILE MENU BUTTON */}
              <div className="md:hidden">
                <Disclosure.Button className="
                  p-2 rounded-xl 
                  bg-white/60 dark:bg-gray-700 
                  shadow hover:bg-white/80 dark:hover:bg-gray-600 
                  transition
                ">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* ⭐ MOBILE MENU */}
          <Disclosure.Panel className="
            md:hidden 
            bg-white/70 dark:bg-gray-900/70 
            dark:text-white 
            backdrop-blur-2xl shadow-lg 
            border-b border-white/40 dark:border-gray-700 
            animate-slideDown
          ">
            <div className="space-y-1 px-4 pt-4 pb-4">
              
              {/* ⭐ GLOBAL MOBILE THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="
                  flex items-center gap-2 w-full 
                  px-4 py-3 rounded-lg 
                  bg-gray-200 dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  font-semibold 
                  hover:bg-gray-300 dark:hover:bg-gray-600 
                  transition
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

              {/* Mobile Links */}
              {[
                { label: "Add Transaction", link: "/add-transaction" },
                { label: "Add Category", link: "/add-category" },
                { label: "Categories", link: "/categories" },
                { label: "Profile", link: "/profile" },
                { label: "Dashboard", link: "/dashboard" },
              ].map((item) => (
                <Disclosure.Button
                  key={item.label}
                  as={Link}
                  to={item.link}
                  className="
                    block px-4 py-3 rounded-lg 
                    text-gray-800 dark:text-white 
                    font-semibold 
                    bg-white/40 dark:bg-gray-700 
                    hover:bg-blue-100 dark:hover:bg-gray-600 
                    transition-all duration-200 shadow-sm
                  "
                >
                  {item.label}
                </Disclosure.Button>
              ))}

              {/* Logout */}
              <Disclosure.Button
                onClick={logoutHandler}
                className="
                  block w-full text-left px-4 py-3 mt-3 rounded-lg 
                  font-semibold 
                  text-red-600 dark:text-red-400 
                  bg-red-100 dark:bg-red-900/40 
                  hover:bg-red-200 dark:hover:bg-red-900/60 
                  transition-all duration-200 shadow-sm active:scale-95
                "
              >
                Logout
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
