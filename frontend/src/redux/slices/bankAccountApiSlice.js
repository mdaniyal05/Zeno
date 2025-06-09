import { apiSlice } from "./apiSlice";

const ACCOUNT_URL = "/api/accounts";

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAccounts: builder.mutation({
      query: () => ({
        url: `${ACCOUNT_URL}/`,
        method: "GET",
      }),
    }),
    getUserAccount: builder.mutation({
      query: () => ({
        url: `${ACCOUNT_URL}/account/:id`,
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
      query: () => ({
        url: `${ACCOUNT_URL}/account/:id`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserAccountsMutation,
  useGetUserAccountMutation,
  useCreateUserAccountMutation,
  useDeleteUserAccountMutation,
} = bankAccountApiSlice;
