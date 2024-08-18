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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRouter />}>
              <Route path="/myprofile" element={<UserProfile />} />
            </Route>
            <Route path="/user/forgot/password" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
          </Routes>
        </HelmetProvider>
      </Router>
    </>
  );
}

export default App;
