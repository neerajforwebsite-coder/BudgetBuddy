import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
  });

  const formik = useFormik({
    initialValues: { type: "", name: "" },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => navigate("/categories"))
        .catch(() => {});
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="
        max-w-lg mx-auto my-10 p-6 rounded-lg shadow-lg space-y-6
        bg-white dark:bg-gray-800
        border border-gray-300 dark:border-gray-700
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Add New Category
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fill in the details below.
        </p>
      </div>

      {isError && (
        <AlertMessage
          type="error"
          message={error?.response?.data?.message || "Something went wrong"}
        />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Category added successfully!" />
      )}

      {/* Category Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 dark:text-gray-200 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>

        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="
            app-input px-3 !h-12 !pl-10
            bg-white dark:bg-gray-800
          "
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Category Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="flex gap-2 items-center text-gray-700 dark:text-gray-200 font-medium"
        >
          <SiDatabricks className="text-blue-500" />
          <span>Name</span>
        </label>

        <input
          type="text"
          id="name"
          placeholder="Category Name"
          {...formik.getFieldProps("name")}
          className="app-input"
        />

        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs">{formik.errors.name}</p>
        )}
      </div>

      <button
        type="submit"
        className="
          mt-4 w-full py-3 rounded-xl 
          bg-blue-600 hover:bg-blue-700 
          text-white font-bold 
          transition duration-200
        "
      >
        {isPending ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategory;
