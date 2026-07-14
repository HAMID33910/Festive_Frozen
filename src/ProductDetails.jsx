import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/api/products/${id}`
      );

      const data = await res.json();

      setProduct(data);

      if (data.categoryId?._id) {
        const relatedRes = await fetch(
          `http://localhost:3001/api/products?categoryId=${data.categoryId._id}`
        );

        const relatedData = await relatedRes.json();

        setRelatedProducts(
          relatedData.filter(
            (item) => item._id !== data._id
          )
        );
      }

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    alert("Product Added to Cart");
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/checkout");
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="product-loading">
          <h2>Loading Product...</h2>
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="product-loading">
          <h2>Product Not Found</h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="product-details-page">

        <div className="product-details-container">

          {/* LEFT SIDE */}

          <div className="details-left">

            <div className="details-image-box">

              <img
                src={`http://localhost:3001/productuploads/${product.productImage}`}
                alt={product.productTitle}
              />

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="details-right">

            <span className="details-category">
              {product.categoryId?.title || "Frozen Food"}
            </span>

            <h1>{product.productTitle}</h1>

            <div className="details-rating">
              ★★★★★
              <span>(4.9 Rating)</span>
            </div>

            <div className="details-price">
              Rs. {product.productPrice}
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="stock-box">

              {product.stock > 0 ? (
                <span className="in-stock">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="out-stock">
                  Out of Stock
                </span>
              )}

            </div>

            <div className="quantity-section">

              <button onClick={decreaseQty}>
                -
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQty}>
                +
              </button>

            </div>

            <div className="details-buttons">

              <button
                className="details-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="details-buy-btn"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

            </div>
                        <div className="details-info-box">

              <div className="info-item">
                <h4>Category</h4>
                <p>
                  {product.categoryId?.title || "Frozen Food"}
                </p>
              </div>

              <div className="info-item">
                <h4>Availability</h4>
                <p>
                  {product.stock > 0
                    ? "Available"
                    : "Out of Stock"}
                </p>
              </div>

              <div className="info-item">
                <h4>Delivery</h4>
                <p>Delivery in 1–3 working days.</p>
              </div>

            </div>

            <div className="details-features">

              <h3>Why You'll Love It</h3>

              <ul>
                <li>Premium quality frozen food.</li>
                <li>Freshly packed and hygienically processed.</li>
                <li>Rich taste with long shelf life.</li>
                <li>Perfect for quick family meals.</li>
                <li>Stored at optimum freezing temperature.</li>
              </ul>

            </div>

          </div>

        </div>

        {relatedProducts.length > 0 && (

          <div className="related-products">

            <h2>Related Products</h2>

            <div className="related-grid">

              {relatedProducts.map((item) => (

                <div
                  className="related-card"
                  key={item._id}
                >

                  <img
                    src={`http://localhost:3001/productuploads/${item.productImage}`}
                    alt={item.productTitle}
                  />

                  <h4>{item.productTitle}</h4>

                  <p>
                    Rs. {item.productPrice}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                  >
                    View Product
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

      </section>

      <Footer />

    </>
  );
}

export default ProductDetails;

            