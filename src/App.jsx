// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./common/pages/auth/Login";
import Register from "./common/pages/auth/Registration";
import Home from "./nonAuth/landing/Home";
import Products from "./nonAuth/Products";
import ProductDetails from "./nonAuth/landing/ProductDetails";
import MainLayout from "./layout/MainLayout";
import Cart from "./nonAuth/Cart";
import { Toaster } from "react-hot-toast";
import Wishlist from "./nonAuth/WishList";
import PaymentPage from "./nonAuth/PaymentPage";
import ErrorResponse from "./nonAuth/ErrorResponse";
import Confirmation from "./nonAuth/Confirmation";
import OrdersPage from "./nonAuth/ordersPage";
import CertificatePage from "./nonAuth/CertificatePage";

function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Routes without Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/confirmation" element={<Confirmation />} />


        {/* Routes with Navbar/Footer wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="*" element={<ErrorResponse />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
