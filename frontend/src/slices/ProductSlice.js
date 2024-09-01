import { createSlice } from "@reduxjs/toolkit";

import { getProduct } from "../features/ProductFeature";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    status: "idle",
    product: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "success";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default ProductSlice.reducer;
