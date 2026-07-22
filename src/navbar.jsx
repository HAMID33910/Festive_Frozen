import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "./assets/logo.png";
import CartSidebar from "./CartSidebar";
import { CartContext } from "./CartContext";
import { API_URL } from "./config";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    wishlistItems,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`${API_URL}/api/search?q=${search}`);
      const data = await res.json();
      setSearchResults(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (user) setRole(user.role);
  }, [location.pathname]);

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/LoginScreen");
    } else {
      navigate("/LoginScreen");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          <Link to="/" className="logo" onClick={scrollToTop}>
            <img src={logo} alt="Festive Frozen logo" />
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>
            <li>
              <Link to="/HotsalesPage">Hot Sales</Link>
            </li>
            <li>
              <Link to="/offers">Discount Offers</Link>
            </li>
            <li>
              <Link to="/TrackOrder">Track Order</Link>
            </li>
            {role === "admin" && (
              <li>
                <Link to="/AdminPanel">Admin Panel</Link>
              </li>
            )}
          </ul>

          <div className="nav-icons">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search products, categories, deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((item) => (
                    <div
                      key={item.type + item._id}
                      className="search-item"
                      onClick={() => {
                        if (item.type === "product") navigate(`/product/${item._id}`);
                        if (item.type === "category") navigate(`/category/${item._id}`);
                        if (item.type === "deal") navigate(`/deal/${item._id}`);
                        setSearch("");
                        setSearchResults([]);
                      }}
                    >
                      <img
                        src={
                          item.type === "deal"
                            ? `${API_URL}/dealuploads/${item.image}`
                            : item.type === "category"
                            ? `${API_URL}/uploads/${item.image}`
                            : `${API_URL}/productuploads/${item.image}`
                        }
                        alt={item.title}
                      />
                      <div>
                        <h4>{item.title}</h4>
                        <span>{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="icon-btn" onClick={() => setIsCartOpen(true)}>
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </button>

            <button className="icon-btn" onClick={() => navigate("/wishlist")}>
              <span className="material-symbols-outlined">favorite</span>
              {wishlistItems.length > 0 && (
                <span className="cart-count">{wishlistItems.length}</span>
              )}
            </button>

            <button
              className="icon-btn"
              onClick={handleAuth}
              title={isLoggedIn ? "Logout" : "Login"}
            >
              <span className="material-symbols-outlined">
                {isLoggedIn ? "logout" : "account_circle"}
              </span>
            </button>

            <button className="menu-btn">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>

        <div className="mobile-menu">
          <Link to="/">Home</Link>
          <Link to="/HotsalesPage">Hot Sales</Link>
          <Link to="/offers">Discount Offers</Link>
          {role === "admin" && (
            <Link to="/AdminPanel">Admin Panel</Link>
          )}
        </div>
      </nav>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </>
  );
}

export default Navbar;
