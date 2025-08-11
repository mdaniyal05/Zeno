import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/v1/categories";

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
      invalidatesTags: ["Category"],
    }),
    updateUserCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteUserCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
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
