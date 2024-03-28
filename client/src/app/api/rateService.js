import { apiService } from "../store/apiService";

export const rateService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getProductRates: builder.query({
      query: (id) => ({
        url: `rates/${id}`,
      }),
      providesTags: ["rate"],
    }),

    updateRate: builder.mutation({
      query: ({ data, id, headers }) => ({
        url: `rates/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["rate"],
    }),
  }),
});

export const { useGetProductRatesQuery, useUpdateRateMutation } = rateService;
