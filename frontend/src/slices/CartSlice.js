import { createSlice } from "@reduxjs/toolkit";
import { AddCartItem } from "../features/CartFeatures";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) ?? [],
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) ?? {},
    priceInfo: JSON.parse(sessionStorage.getItem("priceInfo")) ?? {},
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
    addShippingInfo: (state, action) => {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      state.shippingInfo = action.payload;
    },
    addPriceInfo: (state, action) => {
      sessionStorage.setItem("priceInfo", JSON.stringify(action.payload));
      state.priceInfo = action.payload;
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
          const checkexist = state.items.find(
            (i) => i.product === item.product
          );
          if (checkexist) {
            const chekqunt = state.items?.find(
              (i) => i.quantity == item.quantity
            );
            if (chekqunt) {
              chekqunt.quantity += item.quantity;
            }
          } else {
            state.items = [...state.items, item];
            localStorage.setItem("cartItems", JSON.stringify(state.items));
          }
        } else {
          console.log(item);
          state.items = [...state.items, item];
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        state.status = "success";
      })
      .addCase(AddCartItem.rejected, (state, action) => {
        state.product = Object(action.payload);
        state.status = "failed";
      });
  },
});

export const { removeItemFromCart, addShippingInfo, addPriceInfo } =
  CartSlice.actions;

export default CartSlice.reducer;
