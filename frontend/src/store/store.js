import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import ProductSlice from "../slices/ProductSlice";
import AuthSlice from "../slices/AuthSlice";
import CartSlice from "../slices/CartSlice";

const reducer = combineReducers({
  productsState: productsSlice,
  productState: ProductSlice,
  AuthState: AuthSlice,
  CartState:CartSlice
});

const store = configureStore({
  reducer,
});
export default store;
