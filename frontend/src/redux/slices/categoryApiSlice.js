import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/categories";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserCategories: builder.mutation({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        method: "GET",
      }),
    }),
    getUserCategory: builder.mutation({
      query: () => ({
        url: `${CATEGORY_URL}/category/:id`,
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
      query: (data) => ({
        url: `${CATEGORY_URL}/category/:id`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUserCategory: builder.mutation({
      query: () => ({
        url: `${CATEGORY_URL}/category/:id`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserCategoriesMutation,
  useGetUserCategoryMutation,
  useCreateUserCategoryMutation,
  useUpdateUserCategoryMutation,
  useDeleteUserCategoryMutation,
} = categoryApiSlice;
