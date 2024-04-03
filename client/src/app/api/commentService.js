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

    // deleteBlogLike: builder.mutation({
    //   query: ({ id, headers }) => ({
    //     url: `comment/blog/${id}`,
    //     method: "DELETE",
    //     headers,
    //   }),
    //   invalidatesTags: ["blog"],
    // }),
  }),
});

export const { useCreateCommentMutation } = commentService;
