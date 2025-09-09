import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let INCOME_URL;

if (import.meta.env.PROD) {
  INCOME_URL = `${API_URL}/api/v1/incomes`;
} else {
  INCOME_URL = "/api/v1/incomes";
}

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserIncomes: builder.query({
      query: () => ({
        url: `${INCOME_URL}/`,
        method: "GET",
      }),
      providesTags: ["Income"],
    }),
    getUserIncome: builder.query({
      query: (id) => ({
        url: `${INCOME_URL}/income/${id}`,
        method: "GET",
      }),
      providesTags: ["Income"],
    }),
    createUserIncome: builder.mutation({
      query: (data) => ({
        url: `${INCOME_URL}/create-income`,
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
    updateUserIncome: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${INCOME_URL}/income/${id}`,
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
    deleteUserIncome: builder.mutation({
      query: (id) => ({
        url: `${INCOME_URL}/income/${id}`,
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
  useGetAllUserIncomesQuery,
  useGetUserIncomeQuery,
  useCreateUserIncomeMutation,
  useDeleteUserIncomeMutation,
  useUpdateUserIncomeMutation,
} = incomeApiSlice;
