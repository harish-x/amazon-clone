import { createSlice } from "@reduxjs/toolkit";

import {
  LoadUser,
  LoginUser,
  RegisterUser,
  Logoutuser,
  UpdateUser,
  ChangeUserPassword,
  ForgotUserPassword,
  ResetUserPassword
} from "../features/AuthFeatures";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    isUpdated: "false",
    changepaswordStatus: "false",
    ForgotPasswordState:"false",
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
        state.error = action.error;
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
        state.error = action.error.message;
      })
      .addCase(LoadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = [action.payload];
        state.status = "success";
      })
      .addCase(LoadUser.rejected, (state) => {
        state.status = "failed";
        state.isAuthenticated = false;
      })
      .addCase(Logoutuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Logoutuser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = [null];
        state.status = "success";
        Navigate("/");
        window.location.reload();
      })
      .addCase(Logoutuser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateUser.pending, (state) => {
        state.isUpdated = "loading";
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.user = [action.payload];
        state.isUpdated = "successful";
      })
      .addCase(UpdateUser.rejected, (state) => {
        state.isUpdated = "failed";
      })
      .addCase(ChangeUserPassword.pending, (state) => {
        state.changepaswordStatus = "loading";
      })
      .addCase(ChangeUserPassword.fulfilled, (state) => {
        state.changepaswordStatus = "successful";
      })
      .addCase(ChangeUserPassword.rejected, (state) => {
        state.changepaswordStatus = "failed";
      })
      .addCase(ForgotUserPassword.pending, (state) => {
        state.ForgotPasswordState = "loading";
      })
      .addCase(ForgotUserPassword.fulfilled, (state) => {
        state.ForgotPasswordState = "Email sent";
      })
      .addCase(ForgotUserPassword.rejected, (state) => {
        state.ForgotPasswordState = "failed";
      })
      .addCase(ResetUserPassword.pending, (state) => {
        state.ForgotPasswordState = "loading";
      })
      .addCase(ResetUserPassword.fulfilled, (state) => {
        state.ForgotPasswordState = "Password has been changed";
        state.isAuthenticated = true     
      })
      .addCase(ResetUserPassword.rejected, (state) => {
        state.ForgotPasswordState = "Reset password failed";
      });
  },
});

export default AuthSlice.reducer;
