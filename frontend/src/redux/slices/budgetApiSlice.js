import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let BUDGET_URL;

if (import.meta.env.PROD) {
  BUDGET_URL = `${API_URL}/api/v1/budgets`;
} else {
  BUDGET_URL = "/api/v1/budgets";
}

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
      invalidatesTags: [
        "Account",
        "Category",
        "Income",
        "Expense",
        "Saving",
        "Transaction",
        "Budget",
        "Dashboard",
      ],
    }),
    updateUserBudget: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${BUDGET_URL}/budget/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [
        "Account",
        "Category",
        "Income",
        "Expense",
        "Saving",
        "Transaction",
        "Budget",
        "Dashboard",
      ],
    }),
    deleteUserBudget: builder.mutation({
      query: (id) => ({
        url: `${BUDGET_URL}/budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Account",
        "Category",
        "Income",
        "Expense",
        "Saving",
        "Transaction",
        "Budget",
        "Dashboard",
      ],
    }),
  }),
});

export const {
  useGetAllUserBudgetsQuery,
  useGetUserBudgetQuery,
  useCreateUserBudgetMutation,
  useDeleteUserBudgetMutation,
  useUpdateUserBudgetMutation,
} = budgetApiSlice;
