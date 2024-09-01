import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;
export const confirmOrder = createAsyncThunk(
  "/order/confirmorder",
  async ({ orderItems, shippingInfo, priceInfo }, { rejectWithValue }) => {
    try {
      const itemsPrice = priceInfo.itemsPrice;
      const taxPrice = priceInfo.taxprice;
      const shippingPrice = priceInfo.shippingPrice;
      const totalPrice = priceInfo.totalPrice;

      let neworderitems = Object.values(orderItems).map((items) => ({
        ...items,
        productId: items.product,
        product:undefined
      }))
     
      const result = await axios.post(
        BASEURL + import.meta.env.VITE_NEW_ORDER,
        {
          orderItems:neworderitems,
          shippingInfo,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          paymentInfo: true,
        },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const myOrders = createAsyncThunk("/order/myorder", async(_,{rejectWithValue}) => {
  try {
    const response = await axios.get(BASEURL + import.meta.env.VITE_MY_ORDER, { withCredentials: true });
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getSingleOrder = createAsyncThunk(
  "/order/getSingleorder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BASEURL + import.meta.env.VITE_SINGLE_ORDER + data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
