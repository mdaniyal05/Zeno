import { apiSlice } from "./apiSlice";

const DASHBOARD_URL = "/api/v1/dashboard";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: `${DASHBOARD_URL}/data`,
        method: "GET",
      }),
    }),
  }),
});

export const getDashboardData = dashboardApiSlice;
