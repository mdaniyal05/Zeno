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
      invalidatesTags: ["Transaction"],
    }),
    updateUserTransaction: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteUserTransaction: builder.mutation({
      query: (id) => ({
        url: `${TRANSACTION_URL}/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
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
