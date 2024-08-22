import { createSlice } from "@reduxjs/toolkit";
import { confirmOrder } from "../features/OrderFeature";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    ConfirmOrder: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.ConfirmOrder = action.payload;
        sessionStorage.removeItem("priceInfo");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export default OrderSlice.actions;
