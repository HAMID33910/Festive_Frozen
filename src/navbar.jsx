import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/Logo.png";
import "./navbar.css";
import CartSidebar from "./CartSidebar";
import { CartContext } from "./CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");

  const {
  cartItems,
  isCartOpen,
  setIsCartOpen,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    setIsLoggedIn(!!token);

    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      setRole(user.role);
    }
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

          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logo} alt="Festive Frozen logo" />
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/hotsales">Hot Sales</Link>
            </li>

            <li>
              <Link to="/offers">Discount Offers</Link>
            </li>

            {role === "admin" && (
              <li>
                <Link to="/AdminPanel">Admin Panel</Link>
              </li>
            )}
          </ul>

          {/* Search */}
          <div className="search-box">
            <span className="material-symbols-outlined">
              search
            </span>

            <input
              type="text"
              placeholder="Search frozen favorites..."
            />
          </div>

          {/* Icons */}
          <div className="nav-icons">

            <button className="icon-btn mobile-search">
              <span className="material-symbols-outlined">
                search
              </span>
            </button>

            {/* Cart */}
            <button
              className="icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="material-symbols-outlined">
                shopping_cart
              </span>

              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button className="icon-btn">
              <span className="material-symbols-outlined">
                favorite
              </span>
            </button>

            {/* Login / Logout */}
            <button
              className="icon-btn"
              onClick={handleAuth}
              title={isLoggedIn ? "Logout" : "Login"}
            >
              <span className="material-symbols-outlined">
                {isLoggedIn ? "logout" : "account_circle"}
              </span>
            </button>

            {/* Mobile Menu */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="material-symbols-outlined">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>

          <Link to="/hotsales">
            Hot Sales
          </Link>

          <Link to="/offers">
            Discount Offers
          </Link>

          {role === "admin" && (
            <Link to="/AdminPanel">
              Admin Panel
            </Link>
          )}

          <div className="mobile-search-box">
            <span className="material-symbols-outlined">
              search
            </span>

            <input
              type="text"
              placeholder="Search frozen favorites..."
            />
          </div>
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