import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";

function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(CartContext);

  return (
    <>
      <Navbar />
      <section className="py-16 px-6 max-w-[1280px] mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-primary mb-2">Your Wishlist</h1>
            <p className="text-on-surface-variant">Save your favorite frozen picks and come back anytime.</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl text-on-surface-variant mb-4">No items in your wishlist yet.</h3>
              <Link to="/" className="text-primary font-semibold underline hover:text-primary-dark">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
              {wishlistItems.map((item) => (
                <div className="bg-white rounded-xl overflow-hidden shadow-card border border-wishlist-border" key={item._id}>
                  <img
                    src={`http://localhost:3001/productuploads/${item.productImage}`}
                    alt={item.productTitle}
                    className="w-full h-[220px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-display text-lg text-wishlist-text mb-2">{item.productTitle}</h3>
                    <p className="text-wishlist-price font-bold mb-3">Rs. {item.productPrice}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-4 rounded-lg border-none cursor-pointer text-sm font-semibold bg-wishlist-link text-white hover:bg-wishlist-text" onClick={() => addToCart(item)}>Add to Cart</button>
                      <button className="flex-1 py-2 px-4 rounded-lg border-none cursor-pointer text-sm font-semibold bg-gray-100 text-on-surface-variant hover:bg-gray-200" onClick={() => removeFromWishlist(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </section>
      <Footer />
    </>
  );
}

export default WishlistPage;
