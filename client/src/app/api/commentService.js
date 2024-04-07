import { apiService } from "../store/apiService";

export const commentService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ data, headers, blogId }) => ({
        url: `comments/${blogId}`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    getCommentChild: builder.query({
      query: ({ id }) => ({
        url: `comments/${id}`,
      }),
      providesTags: ["blog"],
    }),

    deleteCommentLike: builder.mutation({
      query: ({ id, headers }) => ({
        url: `comments/blog/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteComment: builder.mutation({
      query: ({ id, headers }) => ({
        url: `comments/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    updateComment: builder.mutation({
      query: ({ data, id, headers }) => ({
        url: `comments/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentChildQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentService;
