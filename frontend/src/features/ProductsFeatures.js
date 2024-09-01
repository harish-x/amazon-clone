import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    { pageNo, currentPage, keyword, fetchPrice, category },
    { rejectWithValue }
  ) => {
    console.log({ pageNo, currentPage, keyword, fetchPrice });

    // const { pageNo, currentPage } = page;
    let nthpage = pageNo ? pageNo : currentPage;
    let link = `
    ${BASEURL}${import.meta.env.VITE_GET_ALL_PRODUCTS}?page=${nthpage}${
      keyword && keyword !== "undefined"
        ? `&keyword=${encodeURIComponent(keyword)}`
        : ""
    }${
      fetchPrice &&
      fetchPrice.length === 2 &&
      fetchPrice[0] !== undefined &&
      fetchPrice[1] !== undefined
        ? `&price[gte]=${fetchPrice[0]}&price[lte]=${fetchPrice[1]}`
        : ""
    }${category && category !== "undefined" ? `&category=${category}` : ""}`;

    try {
      const res = await axios.get(link);
      return res.data;
    } catch (err) {
      console.log(page);
      return rejectWithValue(err.response ? err.response.message : err.message);
    }
  }
);
