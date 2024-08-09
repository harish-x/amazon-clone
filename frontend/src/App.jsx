import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/products/ProductDetails";

function App() {
  return (
    <>
      <Router>
        <HelmetProvider>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </HelmetProvider>
      </Router>
    </>
  );
}

export default App;
