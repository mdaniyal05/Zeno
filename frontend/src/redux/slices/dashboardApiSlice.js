import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let DASHBOARD_URL;

if (import.meta.env.PROD) {
  DASHBOARD_URL = `${API_URL}/api/v1/dashboard`;
} else {
  DASHBOARD_URL = "/api/v1/dashboard";
}

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: `${DASHBOARD_URL}/data`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApiSlice;
