import { apiService } from "../store/apiService";

export const UserService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (headers) => ({
        url: `users/getAll`,
        headers,
      }),
      providesTags: ["user"],
    }),

    getUser: builder.query({
      query: (headers) => ({
        url: `users/getOne`,
        headers,
      }),
      providesTags: ["user", "order", "sale"],
    }),

    createUser: builder.mutation({
      query: ({ data, headers }) => ({
        url: `users`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id, headers }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["user"],
    }),

    updateUserPassword: builder.mutation({
      query: ({ data, id, headers }) => ({
        url: `users/password/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: ({ headers, id }) => ({
        url: `users/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useDeleteUserMutation,
} = UserService;
