import api from "./api";

export const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

export const createExpense = async (payload) => {
  const response = await api.post("/expenses", payload);
  return response.data;
};

export const removeExpense = async (expenseId) => {
  const response = await api.delete(`/expenses/${expenseId}`);
  return response.data;
};
