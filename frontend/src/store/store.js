import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import ProductSlice from "../slices/ProductSlice";

const reducer = combineReducers({
  productsState: productsSlice,
  productState: ProductSlice,
});

const store = configureStore({
  reducer,
});
export default store;
