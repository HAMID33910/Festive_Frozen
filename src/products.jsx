import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./Products.css";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Navbar />
    <section className="products-page">
      <div className="products-container">

        <div className="products-header">
          <div>
            <h1>Our Products</h1>
            <p>
              Browse our complete collection of premium frozen foods.
            </p>
          </div>

          
        </div>

        <div className="products-grid">

          {products.map((product) => (
            <div
              className="product-card"
              key={product._id}
            >

              <div className="product-image">

                <img
                  src={`http://localhost:3001/productuploads/${product.productImage}`}
                  alt={product.productTitle}
                />

              </div>

              <div className="product-content">

                <span className="product-category">
                  {product.categoryId?.title || "Frozen Food"}
                </span>

                <h3>{product.productTitle}</h3>

                <div className="price-row">
                  <span className="price">
                    Rs. {product.productPrice}
                  </span>

                  <span className="rating">
                    ★ 4.9
                  </span>
                </div>

                <div className="product-buttons">

                  <button className="buy-btn">
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
          ))}

        </div>

      </div>
    </section>
    <Footer />
    </>
  );
}

export default Products;