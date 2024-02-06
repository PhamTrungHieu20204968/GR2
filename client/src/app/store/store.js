import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { authSliceReducer } from "features/auth/authSlice";
import filterReducer from '../slices/filterSlice'
const rootReducer = {
  [apiService.reducerPath]: apiService.reducer,
  auth: authSliceReducer,
  filter: filterReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
