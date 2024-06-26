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

    getUserRemind: builder.query({
      query: ({ headers }) => ({
        url: `notifications/remind`,
        headers,
      }),
      providesTags: ["notification", "order"],
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

    updateNotification: builder.mutation({
      query: ({ data, headers, id }) => ({
        url: `notifications/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["notification"],
    }),

    updateRemind: builder.mutation({
      query: ({ data, headers, id }) => ({
        url: `notifications/update-remind/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["notification"],
    }),

    updateScheduleNotifications: builder.mutation({
      query: ({ data, headers }) => ({
        url: `notifications/schedule-notifications`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["notification"],
    }),

    deleteNotification: builder.mutation({
      query: ({ id }) => ({
        url: `notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),

    deleteRemind: builder.mutation({
      query: ({ id }) => ({
        url: `notifications/remind/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetUserNotificationsQuery,
  useGetUserRemindQuery,
  useUpdateSeenNotificationMutation,
  useUpdateNotificationMutation,
  useUpdateRemindMutation,
  useUpdateScheduleNotificationsMutation,
  useDeleteNotificationMutation,
  useDeleteRemindMutation,
} = notificationService;
