import { apiService } from "../store/apiService";

export const orderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGuestCreateOrderMutation, useUserCreateOrderMutation } =
  orderService;
