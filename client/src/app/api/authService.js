import { apiService } from "../store/apiService";

export const AuthService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    googleLogin: builder.mutation({
      query: ({ data }) => ({
        url: `users/google-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    facebookLogin: builder.mutation({
      query: ({ data }) => ({
        url: `users/facebook-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: `users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
} = AuthService;
