import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Collection from "./pages/Collection";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Page not found</h1>} />

        {/* Protected Route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
