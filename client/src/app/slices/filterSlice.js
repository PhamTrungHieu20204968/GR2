import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "",
    price: [0, 100],
    order: 0,
    maxPrice: 100,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    clearFilter: (state, action) => {
      state.category = action.payload.category;
      state.price = action.payload.price;
      state.order = action.payload.order;
    },
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const { setCategory, setOrder, setPrice, setMaxPrice, clearFilter } =
  filterSlice.actions;
