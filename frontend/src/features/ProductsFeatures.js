import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (pageNo, { rejectWithValue }) => {
   
    // console.log( page );
    
    // const { pageNo, currentPage } = page;
    let nthpage = pageNo ? pageNo : 1;
    try {
      const res = await axios.get(`
        ${BASEURL}${import.meta.env.VITE_GET_ALL_PRODUCTS}?page=${nthpage}`
      );
      return res.data;
    } catch (err) {
       console.log(page);
      return rejectWithValue(err.response ? err.response.message : err.message);
    }
  }
);
