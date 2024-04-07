import { apiService } from "../store/apiService";

export const likeService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation({
      query: ({ data, headers }) => ({
        url: `likes/`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlogLike: builder.mutation({
      query: ({ id, headers }) => ({
        url: `likes/blog/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteCommentLike: builder.mutation({
      query: ({ id, headers }) => ({
        url: `likes/comment/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useDeleteBlogLikeMutation,
  useDeleteCommentLikeMutation,
} = likeService;
