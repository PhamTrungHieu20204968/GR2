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

    signUp: builder.mutation({
      query: (data) => ({
        url: `users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    googleLoginSuccess: builder.query({
      query: () => ({
        url: `/users/login/success`,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGoogleLoginSuccessQuery,
} = AuthService;
