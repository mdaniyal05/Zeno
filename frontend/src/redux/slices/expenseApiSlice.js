import { apiSlice } from "./apiSlice";

const EXPENSE_URL = "/api/expenses";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserExpenses: builder.mutation({
      query: () => ({
        url: `${EXPENSE_URL}/`,
        method: "GET",
      }),
    }),
    getUserExpense: builder.mutation({
      query: () => ({
        url: `${EXPENSE_URL}/expense/:id`,
        method: "GET",
      }),
    }),
    createUserExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/create-expense`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUserExpense: builder.mutation({
      query: () => ({
        url: `${EXPENSE_URL}/expense/:id`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserExpensesMutation,
  useGetUserExpenseMutation,
  useCreateUserExpenseMutation,
  useDeleteUserExpenseMutation,
} = expenseApiSlice;
