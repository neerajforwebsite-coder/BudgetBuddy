// src/components/Users/Login.jsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { loginAPI } from "../../services/users/userService";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slice/authSlice";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

// Validation Schema
const formSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: loginAPI,
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(loginAction(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/add-transaction", { replace: true });
    }
  }, [isSuccess, data, dispatch, navigate]);

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
          animate-fadeSlide
        "
      >
        {/* Title */}
        <h2
          className="
            text-4xl font-extrabold text-center 
            bg-gradient-to-r from-blue-700 to-teal-600 
            dark:from-teal-400 dark:to-blue-400
            bg-clip-text text-transparent mb-2
          "
        >
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Login to continue
        </p>

        {/* Error */}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Login failed"}
          />
        )}

        {/* INPUTS */}
        <div className="space-y-5">
          {/* Email */}
          <div className="relative">
            {/* icon wrapper: fixed size, centered, no pointer events */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-300">
              <FaEnvelope className="w-5 h-5" />
            </span>

            <input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Email"
              className="app-input pl-14"
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-300">
              <FaLock className="w-5 h-5" />
            </span>

            <input
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className="app-input pl-14"
            />

            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          onClick={formik.handleSubmit}
          className="
            w-full mt-7 py-3 text-white rounded-xl font-semibold
            bg-gradient-to-r from-blue-600 to-teal-500
            dark:from-teal-500 dark:to-blue-500
            hover:scale-[1.02] hover:shadow-lg active:scale-[0.97]
            transition-all duration-300
          "
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {/* Bottom link */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeSlide {
            animation: fadeSlide 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
}
