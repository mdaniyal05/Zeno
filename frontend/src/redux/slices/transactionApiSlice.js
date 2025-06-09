import { apiSlice } from "./apiSlice";

const TRANSACTION_URL = "/api/transactions";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserTransactions: builder.mutation({
      query: () => ({
        url: `${TRANSACTION_URL}/`,
        method: "GET",
      }),
    }),
    getUserTransaction: builder.mutation({
      query: () => ({
        url: `${TRANSACTION_URL}/transaction/:id`,
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
  }),
});

export const {
  useGetAllUserTransactionsMutation,
  useGetUserTransactionMutation,
  useCreateUserTransactionMutation,
} = transactionApiSlice;
