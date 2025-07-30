import { apiSlice } from "./apiSlice";

const SAVING_URL = "/api/savings";

export const savingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserSavings: builder.query({
      query: () => ({
        url: `${SAVING_URL}/`,
        method: "GET",
      }),
    }),
    getUserSaving: builder.query({
      query: (id) => ({
        url: `${SAVING_URL}/saving/${id}`,
        method: "GET",
      }),
    }),
    createUserSaving: builder.mutation({
      query: (data) => ({
        url: `${SAVING_URL}/create-saving`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserSaving: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${SAVING_URL}/saving/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteUserSaving: builder.mutation({
      query: (id) => ({
        url: `${SAVING_URL}/saving/${id}`,
        method: "DELETE",
      }),
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
