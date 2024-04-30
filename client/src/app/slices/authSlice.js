import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    role: null,
    isLoggedIn: false,
    userId: 0,
    notificationSetting: 0,
    name: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.id;
      state.name = action.payload.name;
      state.notificationSetting = action.payload.notificationSetting;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.role = null;
      state.isLoggedIn = false;
      state.userId = 0;
      state.notificationSetting = 0;
      state.name = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
