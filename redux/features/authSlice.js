import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    
    login: (state, actions) => {
      state = actions.payload;
      return state;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state) => state.auth;