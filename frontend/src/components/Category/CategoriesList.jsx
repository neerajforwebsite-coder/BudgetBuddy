import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: deleteCategoryAPI,
  });

  const handleDelete = (id) => {
    mutateAsync(id)
      .then(() => refetch())
      .catch(() => {});
  };

  return (
    <div
      className="
        max-w-md mx-auto my-10 p-6 rounded-lg shadow-lg
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
      "
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Categories
      </h2>

      {/* Status Messages */}
      {isLoading && <AlertMessage type="loading" message="Loading..." />}
      {isError && (
        <AlertMessage type="error" message={error?.response?.data?.message} />
      )}

      <ul className="space-y-4">
        {data?.map((category) => (
          <li
            key={category?._id}
            className="
              flex justify-between items-center p-3 rounded-md
              bg-gray-100 dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              transition
            "
          >
            <div>
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                {category?.name}
              </span>

              {/* Badge: Income / Expense */}
              <span
                className={`
                  ml-2 px-2 inline-flex text-xs font-semibold rounded-full
                  ${
                    category.type === "income"
                      ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200"
                      : "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-200"
                  }
                `}
              >
                {category?.type?.charAt(0).toUpperCase() +
                  category?.type?.slice(1)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition">
                  <FaEdit />
                </button>
              </Link>

              <button
                onClick={() => handleDelete(category?._id)}
                className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400 transition"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
