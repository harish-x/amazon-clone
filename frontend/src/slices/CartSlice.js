import { createSlice } from "@reduxjs/toolkit";
import { AddCartItem } from "../features/CartFeatures";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    product: {},
    status: "loading",
  },
  reducers: {
    removeItemFromCart: (state, action) => {
      let deleteditems = state.items.find((i) => i.product !== action.payload);
       if (!deleteditems) {
         state.items = [];
         localStorage.removeItem("cartItems");
       } else {
         state.items = [deleteditems];
         localStorage.setItem("cartItems", JSON.stringify(deleteditems));
       }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddCartItem.fulfilled, (state, action) => {
        const item = action.payload;
        if (state.items.length > 1) {
          const checkexist = state.items?.find(
            (i) => i.product == item.product
          );
          if (checkexist) {
            const chekqunt = state.items?.find(
              (i) => i.quantity == item.quantity
            );
            if (chekqunt) {
              chekqunt.quantity = item.quantity;
            }
          }
        } else {
          state.items = [...state.items, item];
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
        state.status = "success";
      })
      .addCase(AddCartItem.rejected, (state, action) => {
        state.product = Object(action.payload);
        state.status = "failed";
      });
  },
});

export const { removeItemFromCart } = CartSlice.actions;

export default CartSlice.reducer;
