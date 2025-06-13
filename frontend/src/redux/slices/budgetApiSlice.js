import { apiSlice } from "./apiSlice";

const BUDGET_URL = "/api/budgets";

export const budgetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserBudgets: builder.query({
      query: () => ({
        url: `${BUDGET_URL}/`,
        method: "GET",
      }),
    }),
    getUserBudget: builder.query({
      query: (id) => ({
        url: `${BUDGET_URL}/budget/${id}`,
        method: "GET",
      }),
    }),
    createUserBudget: builder.mutation({
      query: (data) => ({
        url: `${BUDGET_URL}/create-budget`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUserBudget: builder.mutation({
      query: (id) => ({
        url: `${BUDGET_URL}/budget/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserBudgetsQuery,
  useGetUserBudgetQuery,
  useCreateUserBudgetMutation,
  useDeleteUserBudgetMutation,
} = budgetApiSlice;
