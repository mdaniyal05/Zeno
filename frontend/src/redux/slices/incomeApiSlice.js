import { apiSlice } from "./apiSlice";

const INCOME_URL = "/api/incomes";

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserIncomes: builder.mutation({
      query: () => ({
        url: `${INCOME_URL}/`,
        method: "GET",
      }),
    }),
    getUserIncome: builder.mutation({
      query: () => ({
        url: `${INCOME_URL}/income/:id`,
        method: "GET",
      }),
    }),
    createUserIncome: builder.mutation({
      query: (data) => ({
        url: `${INCOME_URL}/create-income`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUserIncome: builder.mutation({
      query: () => ({
        url: `${INCOME_URL}/income/:id`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserIncomesMutation,
  useGetUserIncomeMutation,
  useCreateUserIncomeMutation,
  useDeleteUserIncomeMutation,
} = incomeApiSlice;
