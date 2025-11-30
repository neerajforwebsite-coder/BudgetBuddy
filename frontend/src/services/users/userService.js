// src/services/users/userService.js
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Helper to get fresh token each time
const authHeader = () => {
  const token = getUserFromStorage();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Normalize axios errors so callers get useful messages
const handleError = (err) => {
  return err.response?.data || { message: err.message || "Something went wrong" };
};

// =========================
// REGISTER USER
// =========================
export const registerAPI = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/users/register`, {
      username,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
};

// =========================
// LOGIN USER
// =========================
export const loginAPI = async ({ email, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/users/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
};

// =========================
// UPDATE PROFILE
// =========================
export const updateProfileAPI = async ({ username, email }) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/v1/users/update-profile`,
      { username, email },
      { headers: authHeader() }
    );
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
};

// =========================
// CHANGE PASSWORD
// =========================
export const changePasswordAPI = async (newPassword) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/v1/users/change-password`,
      { newPassword },
      { headers: authHeader() }
    );
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
};
