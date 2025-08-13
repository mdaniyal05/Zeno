import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "./authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let response = await rawBaseQuery(args, api, extraOptions);

  if (response.error?.status === 401) {
    const refreshResponse = await api.endpoints.refreshToken.initiate(null)(
      api.dispatch,
      api.getState,
      extraOptions
    );

    if (refreshResponse.data?.accessToken) {
      api.dispatch(setToken(refreshResponse.data.accessToken));
      response = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Account",
    "Category",
    "Income",
    "Expense",
    "Saving",
    "Transaction",
    "Budget",
    "Dashboard",
  ],
  endpoints: () => ({}),
});
