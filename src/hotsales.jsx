import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./HotSales.css";
import HotSalesPage from "./HotSalesPage.jsx"
import ProductDetails from "./ProductDetails.jsx"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function HotSales() {
  const [products, setProducts] = useState([]);

  const { addToCart, addToWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        const latestProducts = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setProducts(latestProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBuyNow = (product) => {
  navigate(`/product/${product._id}`);
};

  return (
    <section className="hot-sales-section">
      <div className="hot-sales-container">
        <div className="hot-sales-header">
          <h2>Hot Sales This Week</h2>

          <button
            className="hot-view-all-btn"
            onClick={() => navigate("/HotSalesPage")}
          >
            View All
          </button>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={4}
          loop={products.length > 4}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="hot-product-card">
                <div className="hot-product-image">
                  <img
                    src={`http://localhost:3001/productuploads/${product.productImage}`}
                    alt={product.productTitle}
                  />

                  <div className="sale-badge">HOT</div>

                  <div className="hot-wishlist">
                    <button onClick={() => addToWishlist(product)} aria-label="Add to wishlist">♥</button>
                  </div>
                </div>

                <div className="hot-product-content">
                  <span className="hot-category">
                    {product.categoryId?.title || "Frozen Food"}
                  </span>

                  <h3>{product.productTitle}</h3>

                  <div className="hot-bottom">
                    <div className="hot-price-rating">
                      <span className="hot-price">
                        Rs. {product.productPrice}
                      </span>

                      <div className="hot-rating">
                        ★ <span>4.9</span>
                      </div>
                    </div>

                    <div className="hot-actions">
                      <button
                        className="hot-buy"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </button>

                      <button
                        className="hot-cart"
                        onClick={() => addToCart(product)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HotSales;