import { apiService } from "../store/apiService";

export const blogService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: `blogs/`,
      }),
      providesTags: ["blog"],
    }),
    getUnsafeBlogs: builder.query({
      query: ({ headers }) => ({
        url: `blogs/admin`,
        headers,
      }),
      providesTags: ["blog"],
    }),
    getBlog: builder.query({
      query: ({ id }) => ({
        url: `blogs/${id}`,
      }),
      providesTags: ["blog"],
    }),
    createBlog: builder.mutation({
      query: ({ data, headers }) => ({
        url: `blogs/`,
        method: "POST",
        body: data,
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ data, headers, id }) => ({
        url: `blogs/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    updateUnsafeBlog: builder.mutation({
      query: ({ headers, id ,data}) => ({
        url: `blogs/unsafe-blog/${id}`,
        method: "PUT",
        body: data,
        headers,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: ({ id, headers }) => ({
        url: `blogs/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogQuery,
  useGetUnsafeBlogsQuery,
  useUpdateBlogMutation,
  useUpdateUnsafeBlogMutation,
} = blogService;
