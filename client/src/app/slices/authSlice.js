import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: { accessToken: null, role: null, isLoggedIn: false },
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser,logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
