import { apiService } from "../store/apiService";

export const saleService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserSale: builder.query({
      query: (headers) => ({
        url: `sales/`,
        headers,
      }),
      providesTags: ["sale"],
    }),

    createSale: builder.mutation({
      query: ({ data, headers }) => ({
        url: `sales/`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["sale"],
    }),
  }),
});

export const { useCreateSaleMutation, useGetUserSaleQuery } = saleService;
