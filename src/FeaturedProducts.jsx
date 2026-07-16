import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";
import { CartContext } from "./CartContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart, addToWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="featured-section">

      <div className="featured-header">
        <h2>Our Featured Products</h2>

        <button
          onClick={() => navigate("/products")}
        >
          See All
        </button>
      </div>

      <Swiper
  modules={[Autoplay]}
  spaceBetween={25}
  slidesPerView={4}
  loop
  preventClicks={false}
  preventClicksPropagation={false}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  }}
>
        {products.map((product) => (
          <SwiperSlide key={product._id}>

            <div className="product-card">

              <div className="product-image">

                <img
                  src={`http://localhost:3001/productuploads/${product.productImage}`}
                  alt={product.productTitle}
                />

                <div className="wishlist-overlay">
                  <button onClick={() => addToWishlist(product)} aria-label="Add to wishlist">♥</button>
                </div>

              </div>

              <div className="product-content">

                <span className="category">
                  Frozen Food 
                </span>

                <h3>{product.productTitle}</h3>

                <div className="product-bottom">

                  <div className="price-rating">

                    <span className="price">
                      Rs. {product.productPrice}
                    </span>

                    <div className="rating">
                      ★ <span>4.9</span>
                    </div>

                  </div>

                  <div className="actions">

                    <button
  className="buy-btn"
  onClick={() =>
    navigate(`/product/${product._id}`)
  }
>
  Buy Now
</button>

                    <button
                      className="cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      🛒
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

export default Products;