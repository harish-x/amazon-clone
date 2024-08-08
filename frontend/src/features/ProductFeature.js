import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        BASEURL + import.meta.env.VITE_GET_SINGLE_PRODUCT + id
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.message : err.message);
    }
  }
);
