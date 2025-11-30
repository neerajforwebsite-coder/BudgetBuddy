import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateCategoryAPI,
    mutationKey: ["update-category"],
  });

  const formik = useFormik({
    initialValues: { type: "", name: "" },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync({ ...values, id })
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
        border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Update Category
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fill in the details below.
        </p>
      </div>

      {/* Alerts */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened, please try again."
          }
        />
      )}

      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category updated successfully!"
        />
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
            w-full mt-1 py-2 px-3 rounded-md
            bg-white dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-300
            focus:outline-none
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            transition
          "
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 dark:text-red-400 text-xs">
            {formik.errors.type}
          </p>
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
          className="
            w-full mt-1 py-2 px-3 rounded-md
            bg-white dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-300
            focus:outline-none
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            transition
          "
        />

        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 dark:text-red-400 text-xs italic">
            {formik.errors.name}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full mt-4 py-2 px-4 rounded-md
          bg-blue-500 hover:bg-blue-700
          text-white font-bold 
          transition-all duration-200 active:scale-95
        "
      >
        {isPending ? "Updating..." : "Update Category"}
      </button>
    </form>
  );
};

export default UpdateCategory;
