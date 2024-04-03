import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ["user", "product", "auth", "order", "rate", "blog", "like"],
  endpoints: (builder) => ({}),
});
