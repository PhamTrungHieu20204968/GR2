import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: { accessToken: null, role: null, isLoggedIn: false, userId: 0 },
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.id;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.role = null;
      state.isLoggedIn = false;
      state.userId = 0;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
