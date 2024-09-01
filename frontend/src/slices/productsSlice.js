import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "../features/ProductsFeatures";

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    allproducts: [],
    error: null,
    productCount: 0,
    resPerPage: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allproducts = action.payload;
        state.status = "success";
        state.productCount = action.payload.count;
        state.resPerPage = action.payload.resPerPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductsSlice.reducer;
