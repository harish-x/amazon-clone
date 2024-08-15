import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import ProductSlice from "../slices/ProductSlice";
import AuthSlice from "../slices/AuthSlice";

const reducer = combineReducers({
  productsState: productsSlice,
  productState: ProductSlice,
  AuthState: AuthSlice,
});

const store = configureStore({
  reducer,
});
export default store;
