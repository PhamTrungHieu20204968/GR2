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
      providesTags: ["user"],
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
  }),
});

export const { useGetAllUserQuery, useGetUserQuery } = UserService;
