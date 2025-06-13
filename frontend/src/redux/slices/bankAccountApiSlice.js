import { apiSlice } from "./apiSlice";

const ACCOUNT_URL = "/api/accounts";

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAccounts: builder.query({
      query: () => ({
        url: `${ACCOUNT_URL}/`,
        method: "GET",
      }),
    }),
    getUserAccount: builder.query({
      query: (id) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
        method: "GET",
      }),
    }),
    createUserAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/create-account`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserAccountsQuery,
  useGetUserAccountQuery,
  useCreateUserAccountMutation,
  useDeleteUserAccountMutation,
} = bankAccountApiSlice;
