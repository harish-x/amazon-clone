import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

function App() {
  


  return (
    <>
      <Router>
        <HelmetProvider>
          <Toaster/>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </HelmetProvider>
      </Router>
    </>
  );
}

export default App;
