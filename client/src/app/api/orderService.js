import { apiService } from "../store/apiService";

export const orderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (headers) => ({
        url: `orders/`,
        headers,
      }),
      providesTags: ["order"],
    }),

    getStatistics: builder.query({
      query: (headers) => ({
        url: `orders/statistics`,
        headers,
      }),
      providesTags: ["order"],
    }),

    getTopSale: builder.query({
      query: (headers) => ({
        url: `orders/top-sale`,
        headers,
      }),
      providesTags: ["order"],
    }),

    getUserOrders: builder.query({
      query: (headers) => ({
        url: `orders/user`,
        headers,
      }),
      providesTags: ["order"],
    }),

    getOneOrder: builder.query({
      query: ({ headers, id }) => ({
        url: `orders/${id}`,
        headers,
      }),
      providesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: ({ data, headers, id }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["order"],
    }),

    guestCreateOrder: builder.mutation({
      query: (data) => ({
        url: `orders/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    userCreateOrder: builder.mutation({
      query: ({ data, headers }) => ({
        url: `orders/user`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGuestCreateOrderMutation,
  useUserCreateOrderMutation,
  useGetStatisticsQuery,
  useGetTopSaleQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useGetUserOrdersQuery,
  useGetOneOrderQuery,
} = orderService;
