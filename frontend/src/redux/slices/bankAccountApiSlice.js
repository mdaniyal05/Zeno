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
    updateUserAccount: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
        method: "PUT",
        body: patch,
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
  useUpdateUserAccountMutation,
  useDeleteUserAccountMutation,
} = bankAccountApiSlice;
