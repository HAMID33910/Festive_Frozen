import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./hero.jsx";
import CuratedCollections from "./CuratedCollections";
import SignupScreen from "./signup.jsx";
import LoginScreen from "./login.jsx";
import AdminPanel from "./Admin/adminpanel.jsx";
import CartSidebar from "./CartSidebar";
import Categories from "./Categories.jsx";
import Products from "./Products.jsx";
import Checkout from "./Checkout.jsx"
import Offers from "./Offers.jsx";
import CategoryProducts from "./CategoryProducts.jsx";
import ProductDetails from "./ProductDetails.jsx";
import TrackOrder from "./TrackOrder.jsx"
import HotSalesPage from "./HotSalesPage.jsx"

import WishlistPage from "./WishlistPage";
import DealDetails from "./DealDetails.jsx";
import ForgotPassword from "./ForgotPassword.jsx"
import OTP from "./Otp.jsx";
import ResetPassword from "./ResetPassword.jsx";

function Home() {
  const location = useLocation();
  const [showLoginToast, setShowLoginToast] = useState(false);

  useEffect(() => {
    const shouldShowToast = sessionStorage.getItem("showLoginToast") === "true";
    if (shouldShowToast) {
      setShowLoginToast(true);
      sessionStorage.removeItem("showLoginToast");
    }
  }, [location.pathname]);

  return (
    <>
      <Hero />
      
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/SignupScreen" element={<SignupScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/CartSidebar" element={<CartSidebar />} />
        <Route path="/categories" element={<Categories />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/Checkout" element={<Checkout />}/>
        <Route path="/Offers" element={<Offers />}/>
        <Route path="/category/:id" element={<CategoryProducts />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/TrackOrder" element={<TrackOrder />}/>
        <Route path="/HotSalesPage" element={<HotSalesPage />}/>
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/Deal/:id" element={<DealDetails />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/OTP" element={<OTP />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;