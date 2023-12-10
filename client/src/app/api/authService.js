import { apiService } from "../store/apiService";

export const AuthService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: `users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
} = AuthService;
