import { createSlice } from "@reduxjs/toolkit";

import { LoginUser } from "../features/AuthFeatures";

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
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
