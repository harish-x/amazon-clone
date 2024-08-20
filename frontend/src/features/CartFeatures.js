import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;
export const AddCartItem = createAsyncThunk(
  "/cart/addcartitem",
  async (data, { rejectWithValue }) => {
    try {
      const { _id, quantity } = data;
      const res = await axios.get(
        BASEURL + import.meta.env.VITE_GET_SINGLE_PRODUCT + _id
      );
      let { product } = res.data;
      let response = {
        product: product._id,
        name: product.name,
        image: product.images[0].image,
        price:product.price,
        stock: product.stock,
        quantity,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
