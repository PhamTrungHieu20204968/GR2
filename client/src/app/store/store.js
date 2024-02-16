import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiService } from "./apiService";
import { authSliceReducer } from "../slices/authSlice";
import { filterSliceReducer } from "../slices/filterSlice";
import { cartSliceReducer } from "../slices/cartSlice";
const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  auth: authSliceReducer,
  filter: filterSliceReducer,
  cart: cartSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiService.middleware
    ),
});

export const persistor = persistStore(store);
export default store;
