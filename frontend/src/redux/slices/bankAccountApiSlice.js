import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let ACCOUNT_URL;

if (import.meta.env.PROD) {
  ACCOUNT_URL = `${API_URL}/api/v1/accounts`;
} else {
  ACCOUNT_URL = "/api/v1/accounts";
}

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
    updateUserAccount: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
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
    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `${ACCOUNT_URL}/account/${id}`,
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
  useGetAllUserAccountsQuery,
  useGetUserAccountQuery,
  useCreateUserAccountMutation,
  useUpdateUserAccountMutation,
  useDeleteUserAccountMutation,
} = bankAccountApiSlice;
