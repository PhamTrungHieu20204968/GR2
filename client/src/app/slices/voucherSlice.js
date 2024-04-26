import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
  name: "cart",
  initialState: 0,
  reducers: {
    updateVoucher: (state, action) => {
      return action.payload;
    },
  },
});

export const voucherSliceReducer = voucherSlice.reducer;
export const { updateVoucher } = voucherSlice.actions;
