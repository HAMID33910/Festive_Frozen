import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./hero.jsx";
import CuratedCollections from "./CuratedCollections";
import SignupScreen from "./signup.jsx";
import LoginScreen from "./login.jsx";
import AdminPanel from "./Admin/adminpanel.jsx";
import CartSidebar from "./CartSidebar";
import Categories from "./Categories.jsx";
import Products from "./Products";
import Checkout from "./Checkout.jsx"
import Offers from "./Offers.jsx";
import CategoryProducts from "./CategoryProducts.jsx";
import ProductDetails from "./ProductDetails.jsx";
import TrackOrder from "./TrackOrder.jsx"
import HotSalesPage from "./HotSalesPage.jsx"
function Home() {
  return <Hero />;
  
}




function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      
      
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
        {/* <Route path="/CategoryProducts/:id" element={<CategoryProducts />}/> */}
        <Route path="/category/:id" element={<CategoryProducts />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/TrackOrder" element={<TrackOrder />}/>
        <Route path="/HotSalesPage" element={<HotSalesPage />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;