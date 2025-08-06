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
    }),
    getProfile: builder.query({
      query: (id) => ({
        url: `${USER_URL}/profile/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApiSlice;
