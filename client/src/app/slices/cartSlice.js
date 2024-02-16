import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      var flag = 0;
      const newState = state.map((item) => {
        if (item.id === action.payload.id) {
          flag = 1;
          return { ...item, quantity: action.payload.quantity + item.quantity };
        } else return item;
      });
      if (flag === 1) {
        return newState;
      } else return [...state, action.payload];
    },
    deleteItem: (state, action) => {
      const newState = state.filter((item) => {
        return item.id !== action.payload && item;
      });
      return newState;
    },
  },
});

export const cartSliceReducer = cartSlice.reducer;
export const { addToCart ,deleteItem} = cartSlice.actions;
