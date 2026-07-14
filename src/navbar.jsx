import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "./assets/Logo.png";
import "./navbar.css";
import CartSidebar from "./CartSidebar";
import { CartContext } from "./CartContext";
import HotSalesPage from "./HotSalesPage.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
} = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();


  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

useEffect(() => {

  if (!search.trim()) {
    setSearchResults([]);
    return;
  }

  const timer = setTimeout(async () => {

    const res = await fetch(
      `http://localhost:3001/api/search?q=${search}`
    );

    const data = await res.json();

    setSearchResults(data);

  }, 300);

  return () => clearTimeout(timer);

}, [search]);

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
          <Link to="/" className="logo" onClick={scrollToTop}>
            <img src={logo} alt="Festive Frozen logo" />
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={scrollToTop}>
                    Home
                </Link>
                  </li>

            <li>
              {/* <Link to="/hotsales">Hot Sales</Link> */}
              <Link to = "/HotsalesPage">Hot Sales</Link>
            </li>

            <li>
              <Link to="/offers">Discount Offers</Link>
            </li>

            <li>
                <Link to="/TrackOrder">
               Track Order
                  </Link>
                    </li>

            {role === "admin" && (
              <li>
                <Link to="/AdminPanel">Admin Panel</Link>
              </li>
            )}
          </ul>

          {/* Search */}
          {/* <div className="search-box">
            <span className="material-symbols-outlined">
              search
            </span>

            <input
              type="text"
              placeholder="Search frozen favorites..."
            />
          </div> */}

          {/* Icons */}
          <div className="nav-icons">

            {/* <button className="icon-btn mobile-search">
              <span className="material-symbols-outlined">
                search
              </span>
            </button> */}

            <div className="search-box">

  <span className="material-symbols-outlined">
    search
  </span>

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

            if (item.type === "product") {
              navigate(`/product/${item._id}`);
            }

            if (item.type === "category") {
              navigate(`/category/${item._id}`);
            }

            if (item.type === "deal") {
              navigate(`/deal/${item._id}`);
            }

            setSearch("");
            setSearchResults([]);

          }}
        >

          <img
            src={
              item.type === "deal"
                ? `http://localhost:3001/dealuploads/${item.image}`
                : item.type === "category"
                ? `http://localhost:3001/uploads/${item.image}`
                : `http://localhost:3001/productuploads/${item.image}`
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

          <Link to="/HotSalesPage">
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