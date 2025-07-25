import { apiSlice } from "./apiSlice";

const TRANSACTION_URL = "/api/transactions";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTION_URL}/`,
        method: "GET",
      }),
    }),
    getUserTransaction: builder.query({
      query: (id) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
        method: "GET",
      }),
    }),
    createUserTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTION_URL}/create-transaction`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserTransaction: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteUserTransaction: builder.mutation({
      query: (id) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
        method: "DELETE",
      }),
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
