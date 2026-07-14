import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";
import "./WishlistPage.css";

function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(CartContext);

  return (
    <>
      <Navbar />
      <section className="wishlist-page">
        <div className="wishlist-container">
          <div className="wishlist-header">
            <h1>Your Wishlist</h1>
            <p>Save your favorite frozen picks and come back anytime.</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty">
              <h3>No items in your wishlist yet.</h3>
              <Link to="/" className="wishlist-link">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div className="wishlist-card" key={item._id}>
                  <img
                    src={`http://localhost:3001/productuploads/${item.productImage}`}
                    alt={item.productTitle}
                  />
                  <div className="wishlist-card-content">
                    <h3>{item.productTitle}</h3>
                    <p>Rs. {item.productPrice}</p>
                    <div className="wishlist-actions">
                      <button onClick={() => addToCart(item)}>Add to Cart</button>
                      <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default WishlistPage;
