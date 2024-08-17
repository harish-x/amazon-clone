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

export const Logoutuser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post(BASEURL + import.meta.env.VITE_LOGOUT)
    return res.data
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const UpdateUser = createAsyncThunk(
  "auth/updateuser",
  async (data, { rejectWithValue }) => {

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      };
      const res = await axios.put(
        BASEURL + import.meta.env.VITE_UPDATE_PROFILE,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const ChangeUserPassword = createAsyncThunk(
  "auth/changeuserpassword",
  async (data, { rejectWithValue }) => {

    try {
      const config = {
        withCredentials: true,
      };
      const res = await axios.put(
        BASEURL + import.meta.env.VITE_CHANGE_PASSWORD,data,
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);