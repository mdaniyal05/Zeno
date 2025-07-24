import { apiSlice } from "./apiSlice";

const EXPENSE_URL = "/api/expenses";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserExpenses: builder.query({
      query: () => ({
        url: `${EXPENSE_URL}/`,
        method: "GET",
      }),
    }),
    getUserExpense: builder.query({
      query: (id) => ({
        url: `${EXPENSE_URL}/expense/${id}`,
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
    updateUserExpense: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${EXPENSE_URL}/expense/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteUserExpense: builder.mutation({
      query: (id) => ({
        url: `${EXPENSE_URL}/expense/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserExpensesQuery,
  useGetUserExpenseQuery,
  useCreateUserExpenseMutation,
  useUpdateUserExpenseMutation,
  useDeleteUserExpenseMutation,
} = expenseApiSlice;
