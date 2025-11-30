// src/components/Users/Register.jsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../services/users/userService";
import { useNavigate, Link } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// Validation Schema
const formSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Register() {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-blue-100 via-white to-teal-100 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
        p-6 text-gray-900 dark:text-gray-100
      "
    >
      <div
        className="
          w-full max-w-md 
          bg-white/70 dark:bg-gray-800/60 
          backdrop-blur-xl shadow-xl rounded-3xl p-10 
          border border-white/40 dark:border-gray-700 
          animate-fadeIn
        "
      >
        <h2
          className="
            text-4xl font-extrabold text-center 
            bg-gradient-to-r from-teal-600 to-blue-600 
            dark:from-blue-400 dark:to-teal-300
            bg-clip-text text-transparent mb-2
          "
        >
          Create Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign up to get started with BudgetBuddy
        </p>

        {/* Error */}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Registration failed"}
          />
        )}

        {/* INPUTS */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-3 left-4 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              {...formik.getFieldProps("username")}
              placeholder="Username"
              className="
                w-full pl-12 pr-4 py-3 rounded-xl 
                bg-white dark:bg-gray-700 
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-300
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                transition
              "
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-4 text-gray-400 dark:text-gray-300" />
            <input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Email"
              className="
                w-full pl-12 pr-4 py-3 rounded-xl 
                bg-white dark:bg-gray-700 
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-300
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                transition
              "
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-4 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className="
                w-full pl-12 pr-4 py-3 rounded-xl 
                bg-white dark:bg-gray-700 
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-300
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                transition
              "
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-4 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Confirm Password"
              className="
                w-full pl-12 pr-4 py-3 rounded-xl 
                bg-white dark:bg-gray-700 
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-300
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                transition
              "
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full mt-4 py-3 text-white rounded-xl font-semibold
              bg-gradient-to-r from-indigo-600 to-blue-500 
              dark:from-blue-500 dark:to-indigo-500
              hover:scale-[1.02] hover:shadow-lg 
              active:scale-[0.97] transition-all duration-300
            "
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
}
