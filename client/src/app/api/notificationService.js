import { apiService } from "../store/apiService";

export const notificationService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotifications: builder.query({
      query: ({ headers }) => ({
        url: `notifications/`,
        headers,
      }),
      providesTags: ["notification"],
    }),

    createNotification: builder.mutation({
      query: ({ data, headers }) => ({
        url: `notifications/`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["notification"],
    }),

    updateSeenNotification: builder.mutation({
      query: ({ headers }) => ({
        url: `notifications/`,
        method: "PUT",
        headers,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetUserNotificationsQuery,
  useUpdateSeenNotificationMutation,
} = notificationService;
