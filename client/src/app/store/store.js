import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { authSliceReducer } from "features/auth/authSlice";
const rootReducer = {
  [apiService.reducerPath]: apiService.reducer,
  auth: authSliceReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
