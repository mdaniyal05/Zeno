import { apiSlice } from "./apiSlice";

const BUDGET_URL = "/api/v1/budgets";

export const budgetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserBudgets: builder.query({
      query: () => ({
        url: `${BUDGET_URL}/`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    getUserBudget: builder.query({
      query: (id) => ({
        url: `${BUDGET_URL}/budget/${id}`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    createUserBudget: builder.mutation({
      query: (data) => ({
        url: `${BUDGET_URL}/create-budget`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Budget"],
    }),
    deleteUserBudget: builder.mutation({
      query: (id) => ({
        url: `${BUDGET_URL}/budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const {
  useGetAllUserBudgetsQuery,
  useGetUserBudgetQuery,
  useCreateUserBudgetMutation,
  useDeleteUserBudgetMutation,
} = budgetApiSlice;
