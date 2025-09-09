import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let SAVING_URL;

if (import.meta.env.PROD) {
  SAVING_URL = `${API_URL}/api/v1/savings`;
} else {
  SAVING_URL = "/api/v1/savings";
}

export const savingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserSavings: builder.query({
      query: () => ({
        url: `${SAVING_URL}/`,
        method: "GET",
      }),
      providesTags: ["Saving"],
    }),
    getUserSaving: builder.query({
      query: (id) => ({
        url: `${SAVING_URL}/saving/${id}`,
        method: "GET",
      }),
      providesTags: ["Saving"],
    }),
    createUserSaving: builder.mutation({
      query: (data) => ({
        url: `${SAVING_URL}/create-saving`,
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
    updateUserSaving: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${SAVING_URL}/saving/${id}`,
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
    deleteUserSaving: builder.mutation({
      query: (id) => ({
        url: `${SAVING_URL}/saving/${id}`,
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
  useGetAllUserSavingsQuery,
  useGetUserSavingQuery,
  useCreateUserSavingMutation,
  useUpdateUserSavingMutation,
  useDeleteUserSavingMutation,
} = savingApiSlice;
