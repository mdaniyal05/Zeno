import { apiSlice } from "./apiSlice";

const TRANSACTION_URL = "/api/v1/transactions";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTION_URL}/`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getUserTransaction: builder.query({
      query: (id) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    createUserTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTION_URL}/create-transaction`,
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
    updateUserTransaction: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
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
    deleteUserTransaction: builder.mutation({
      query: (id) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
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
  useGetAllUserTransactionsQuery,
  useGetUserTransactionQuery,
  useCreateUserTransactionMutation,
  useUpdateUserTransactionMutation,
  useDeleteUserTransactionMutation,
} = transactionApiSlice;
