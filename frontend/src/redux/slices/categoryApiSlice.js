import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/v1/categories";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        method: "GET",
      }),
    }),
    getUserCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "GET",
      }),
    }),
    createUserCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/create-category`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteUserCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/category/${id}`,
        method: "DELETE",
      }),
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
