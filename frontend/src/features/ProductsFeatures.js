import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ pageNo, currentPage, keyword }, { rejectWithValue }) => {
    console.log({ pageNo, currentPage, keyword });

    // const { pageNo, currentPage } = page;
    let nthpage = pageNo ? pageNo : currentPage;
    let link = `
        ${BASEURL}${import.meta.env.VITE_GET_ALL_PRODUCTS}?page=${nthpage}${
      keyword !== "undefined" && keyword !== undefined
        ? `&keyword=${keyword}`
        : ""
    }`;
    console.log(link);

    try {
      const res = await axios.get(link);
      return res.data;
    } catch (err) {
      console.log(page);
      return rejectWithValue(err.response ? err.response.message : err.message);
    }
  }
);
