import { createSlice } from "@reduxjs/toolkit";
import { confirmOrder, myOrders,getSingleOrder } from "../features/OrderFeature";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    ConfirmOrder: [],
    SingleOrder:[],
    orders: [],
    status:"idle"
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
      .addCase(myOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.orders = [action.payload]
        state.status = "success";
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.SingleOrder = [action.payload]
        state.status = "success";
      });
  },
});

export default OrderSlice.reducer;
