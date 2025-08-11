import { apiSlice } from "./apiSlice";

const EXPENSE_URL = "/api/v1/expenses";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserExpenses: builder.query({
      query: () => ({
        url: `${EXPENSE_URL}/`,
        method: "GET",
      }),
      providesTags: ["Expense"],
    }),
    getUserExpense: builder.query({
      query: (id) => ({
        url: `${EXPENSE_URL}/expense/${id}`,
        method: "GET",
      }),
      providesTags: ["Expense"],
    }),
    createUserExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/create-expense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
    updateUserExpense: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${EXPENSE_URL}/expense/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteUserExpense: builder.mutation({
      query: (id) => ({
        url: `${EXPENSE_URL}/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
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
