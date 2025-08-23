import { apiSlice } from "./apiSlice";

const USER_URL = "/api/v1/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${USER_URL}/profile/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: (id) => ({
        url: `${USER_URL}/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: `${USER_URL}/delete-profile`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApiSlice;
