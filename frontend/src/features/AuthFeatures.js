import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const LoginUser = createAsyncThunk(
  "auth/Login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        BASEURL + import.meta.env.VITE_LOGIN_USER,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const RegisterUser = createAsyncThunk("auth/registeruser", async (data, { rejectWithValue }) => {
  console.log(data);
  
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    };
    const res = await axios.post(BASEURL + import.meta.env.VITE_REGISTER_USER, data,config);
    return  res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const LoadUser = createAsyncThunk(
  "auth/loaduser",
  async (_, { rejectWithValue }) => {

    try {
      const res = await axios.get(BASEURL + import.meta.env.VITE_CHECKUSER, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

