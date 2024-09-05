import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import ProductSlice from "../slices/ProductSlice";
import AuthSlice from "../slices/AuthSlice";
import CartSlice from "../slices/CartSlice";
import OrderSlice from "../slices/OrderSlice";

const disableDevToolsMiddleware = (store) => (next) => (action) => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    delete window.__REDUX_DEVTOOLS_EXTENSION__;
  }
  return next(action);
};

const reducer = combineReducers({
  productsState: productsSlice,
  productState: ProductSlice,
  AuthState: AuthSlice,
  CartState: CartSlice,
  OrderState: OrderSlice
});

const store = configureStore({
  reducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(disableDevToolsMiddleware),
});
export default store;
