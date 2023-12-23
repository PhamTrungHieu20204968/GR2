import { apiService } from "../store/apiService";

export const ProductService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `products/categories`,
      }),
      providesTags: ["product"],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
      }),
      providesTags: ["product"],
    }),

    getAllProductsAdmin: builder.query({
      query: () => ({
        url: `products/admin`,
      }),
      providesTags: ["product"],
    }),

    createProduct: builder.mutation({
      query: ({ data, headers }) => ({
        url: `products/create`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `products/update/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: ({ id, headers }) => ({
        url: `products/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateProductMutation,
  useGetAllProductsAdminQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} = ProductService;
