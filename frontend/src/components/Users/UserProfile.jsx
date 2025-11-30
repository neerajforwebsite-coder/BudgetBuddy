import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import UpdatePassword from "./UpdatePassword";

const UserProfile = () => {
  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({ mutationFn: updateProfileAPI });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        py-12 px-4 
        text-gray-900 dark:text-gray-100
      "
    >
      {/* Main Card */}
      <div
        className="
          max-w-3xl mx-auto p-10 rounded-3xl shadow-xl 
          backdrop-blur-xl 
          bg-white/60 dark:bg-gray-800/60 
          border border-white/40 dark:border-gray-700 
          animate-profileFade
        "
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-2 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Manage your personal information below.
        </p>

        {/* ALERTS */}
        <div className="mb-4">
          {isPending && (
            <AlertMessage type="loading" message="Updating profile..." />
          )}
          {isError && (
            <AlertMessage
              type="error"
              message={error?.response?.data?.message || "Something went wrong"}
            />
          )}
          {isSuccess && (
            <AlertMessage type="success" message="Profile updated successfully!" />
          )}
        </div>

        {/* PROFILE FORM */}
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Username */}
          <div className="group">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Username
            </label>

            <div
              className="
                flex items-center 
                bg-white dark:bg-gray-700 
                shadow-md dark:shadow-none
                rounded-xl px-4 py-3 mt-1 
                transition-all group-hover:shadow-lg
                border border-gray-200 dark:border-gray-600
              "
            >
              <FaUser className="text-indigo-500 dark:text-indigo-300 text-xl mr-3" />
              <input
                type="text"
                placeholder="Enter username"
                {...formik.getFieldProps("username")}
                className="
                  w-full bg-transparent text-gray-900 dark:text-gray-100 
                  placeholder-gray-500 dark:placeholder-gray-300
                  focus:outline-none
                "
              />
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Email
            </label>

            <div
              className="
                flex items-center 
                bg-white dark:bg-gray-700 
                shadow-md dark:shadow-none
                rounded-xl px-4 py-3 mt-1 
                transition-all group-hover:shadow-lg
                border border-gray-200 dark:border-gray-600
              "
            >
              <FaEnvelope className="text-indigo-500 dark:text-indigo-300 text-xl mr-3" />
              <input
                type="email"
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
                className="
                  w-full bg-transparent text-gray-900 dark:text-gray-100
                  placeholder-gray-500 dark:placeholder-gray-300 
                  focus:outline-none
                "
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="
              w-full py-3 
              bg-indigo-600 hover:bg-indigo-700 
              dark:bg-indigo-500 dark:hover:bg-indigo-600 
              text-white text-lg font-semibold rounded-xl 
              shadow-md transition-all hover:scale-[1.02]
            "
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-10 border-t border-gray-300 dark:border-gray-600"></div>

        {/* CHANGE PASSWORD SECTION */}
        <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-5 flex items-center justify-center gap-2">
          <FaLock /> Change Your Password
        </h2>

        <div className="mt-4">
          <UpdatePassword />
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes profileFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-profileFade {
            animation: profileFade 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;
