import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let CATEGORY_URL;

if (import.meta.env.PROD) {
  CATEGORY_URL = `${API_URL}/api/v1/categories`;
} else {
  CATEGORY_URL = "/api/v1/categories";
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getUserCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createUserCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/create-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "Account",
        "Category",
        "Income",
        "Expense",
        "Saving",
        "Transaction",
        "Budget",
        "Dashboard",
      ],
    }),
    updateUserCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [
        "Account",
        "Category",
        "Income",
        "Expense",
        "Saving",
        "Transaction",
        "Budget",
        "Dashboard",
      ],
    }),
    deleteUserCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Account",
        "Category",
        "Income",
        "Expense",
        "Saving",
        "Transaction",
        "Budget",
        "Dashboard",
      ],
    }),
  }),
});

export const {
  useGetAllUserCategoriesQuery,
  useGetUserCategoryQuery,
  useCreateUserCategoryMutation,
  useUpdateUserCategoryMutation,
  useDeleteUserCategoryMutation,
} = categoryApiSlice;
