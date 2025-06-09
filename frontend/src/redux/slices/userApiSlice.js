import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile/:id`,
        method: "PUT",
        body: data,
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
