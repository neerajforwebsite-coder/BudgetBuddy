import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Always fetch the latest token
const authHeader = () => {
  const token = getUserFromStorage();
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Create Transaction
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/transactions/create`,
    { type, category, date, description, amount },
    { headers: authHeader() }
  );
  return response.data;
};

// Update Transaction
export const updateTransactionAPI = async ({
  id,
  type,
  category,
  date,
  description,
  amount,
}) => {
  const response = await axios.put(
    `${BASE_URL}/api/v1/transactions/update/${id}`,
    { type, category, date, description, amount },
    { headers: authHeader() }
  );
  return response.data;
};

// Delete Transaction
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/transactions/delete/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};

// List Transactions
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/transactions/lists`,
    {
      params: { category, type, startDate, endDate },
      headers: authHeader(),
    }
  );
  return response.data;
};
