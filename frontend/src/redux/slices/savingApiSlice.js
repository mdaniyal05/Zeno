import { apiSlice } from "./apiSlice";

const SAVING_URL = "/api/v1/savings";

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
      invalidatesTags: ["Saving"],
    }),
    updateUserSaving: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${SAVING_URL}/saving/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Saving"],
    }),
    deleteUserSaving: builder.mutation({
      query: (id) => ({
        url: `${SAVING_URL}/saving/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Saving"],
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
