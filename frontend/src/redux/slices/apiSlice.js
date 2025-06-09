import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "Account",
    "Category",
    "Income",
    "Expense",
    "Transaction",
    "Budget",
  ],
  endpoints: () => ({}),
});
