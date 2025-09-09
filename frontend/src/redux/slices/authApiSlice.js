import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let AUTH_URL;

if (import.meta.env.PROD) {
  AUTH_URL = `${API_URL}/api/v1/auth`;
} else {
  AUTH_URL = "/api/v1/auth";
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/refresh-token`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApiSlice;
