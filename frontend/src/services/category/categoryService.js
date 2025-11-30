import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Always get fresh token
const authHeader = () => {
  const token = getUserFromStorage();
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Add Category
export const addCategoryAPI = async ({ name, type }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/categories/create`,
      { name, type },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      "Failed to add category. Please try again.";
    throw new Error(msg);
  }
};

// Update Category
export const updateCategoryAPI = async ({ name, type, id }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/categories/update/${id}`,
      { name, type },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      "Failed to update category. Please try again.";
    throw new Error(msg);
  }
};

// Delete Category (FULLY FIXED)
export const deleteCategoryAPI = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/categories/delete/${id}`,
      { headers: authHeader() }
    );

    return response.data; // contains {message, payload}

  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      "Failed to delete category. Please try again.";

    throw new Error(msg); // Prevents undefined payload crash
  }
};

// List Categories
export const listCategoriesAPI = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/categories/lists`,
      { headers: authHeader() }
    );

    return response.data; // contains {message, payload}

  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      "Failed to fetch categories. Try again later.";

    throw new Error(msg);
  }
};
