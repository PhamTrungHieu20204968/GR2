import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    updateSocket: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { updateSocket } = socketSlice.actions;
export const socketSliceReducer = socketSlice.reducer;
