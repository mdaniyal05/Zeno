import { apiSlice } from "./apiSlice";

const INCOME_URL = "/api/incomes";

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserIncomes: builder.query({
      query: () => ({
        url: `${INCOME_URL}/`,
        method: "GET",
      }),
    }),
    getUserIncome: builder.query({
      query: (id) => ({
        url: `${INCOME_URL}/income/${id}`,
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
    updateUserIncome: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${INCOME_URL}/income/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteUserIncome: builder.mutation({
      query: (id) => ({
        url: `${INCOME_URL}/income/${id}`,
        method: "DELETE",
      }),
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
