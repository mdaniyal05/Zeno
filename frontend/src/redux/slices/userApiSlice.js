import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let USER_URL;

if (import.meta.env.PROD) {
  USER_URL = `${API_URL}/api/v1/users`;
} else {
  USER_URL = "/api/v1/users";
}

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

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = userApiSlice;
