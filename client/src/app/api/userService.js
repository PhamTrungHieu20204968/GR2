import { apiService } from "../store/apiService";

export const UserService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (headers) => ({
        url: `users/getAll`,
        headers,
      }),
      providesTags: ["users"],
    }),

    createUser: builder.mutation({
      query: ({ data, headers }) => ({
        url: `users`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id, headers }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAllUserQuery } = UserService;
