import { createSlice } from "@reduxjs/toolkit";

import { LoadUser, LoginUser,RegisterUser } from "../features/AuthFeatures";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    isAuthenticated: false,
    user: [],        
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = [action.payload];
        state.status = "success";
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = [action.payload];
        state.status = "success";
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload;
      })
    .addCase(LoadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = [action.payload];
        state.status = "success";
      })
      .addCase(LoadUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
      });
  },
});

export default AuthSlice.reducer;
