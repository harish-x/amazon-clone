import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const LoginUser = createAsyncThunk(
  "auth/Login",
  async ({email,password}, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASEURL + import.meta.env.VITE_LOGIN_USER,{email,password});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.message : err.message);
    }
  }
);
