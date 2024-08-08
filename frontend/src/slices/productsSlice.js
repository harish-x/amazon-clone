import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "../features/ProductsFeatures";


const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    allproducts: [],
    error: null,
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
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.payload;
      });
  },
});

export default ProductsSlice.reducer;
