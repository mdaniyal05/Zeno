import { apiSlice } from "./apiSlice";

const ACCOUNT_URL = "/api/v1/accounts";

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAccounts: builder.query({
      query: () => ({
        url: `${ACCOUNT_URL}/`,
        method: "GET",
      }),
      providesTags: ["Account"],
    }),
    getUserAccount: builder.query({
      query: (id) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
        method: "GET",
      }),
      providesTags: ["Account"],
    }),
    createUserAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/create-account`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
    updateUserAccount: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Account"],
    }),
    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
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
