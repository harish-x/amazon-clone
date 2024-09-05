import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import ProductSlice from "../slices/ProductSlice";
import AuthSlice from "../slices/AuthSlice";
import CartSlice from "../slices/CartSlice";
import OrderSlice from "../slices/OrderSlice";

const reducer = combineReducers({
  productsState: productsSlice,
  productState: ProductSlice,
  AuthState: AuthSlice,
  CartState: CartSlice,
  OrderState: OrderSlice
});

const store = configureStore({
  reducer,
  devTools:false
});
export default store;
