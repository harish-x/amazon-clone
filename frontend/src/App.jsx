import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/products/ProductDetails";
import ProductSearch from "./components/products/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadUser } from "./features/AuthFeatures";
import UserProfile from "./components/user/UserProfile";
import ProtectedRouter from "./router/ProtectedRouter";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import AuthExistRouter from "./router/AuthExistRouter";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import Myorders from "./components/orders/Myorders";
import OrderDetails from "./components/orders/OrderDetails";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadUser());
  }, []);
  return (
    <>
      <Router>
        <HelmetProvider>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search/:keyword" element={<ProductSearch />} />

            <Route element={<ProtectedRouter />}>
              <Route path="/myprofile" element={<UserProfile />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="order/confirm/payment" element={<Payment />} />
              <Route path="/myorders" element={<Myorders />} />
              <Route path="/detailorder/:id" element={<OrderDetails/>}/>
            </Route>
            <Route element={<AuthExistRouter />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/user/forgot/password"
                element={<ForgotPassword />}
              />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer/>
        </HelmetProvider>
      </Router>
    </>
  );
}

export default App;
