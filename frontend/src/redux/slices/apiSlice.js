import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

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
