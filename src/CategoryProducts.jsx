import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
// import { useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./CategoryProducts.css";

function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const { addToCart } = useContext(CartContext);
  const printRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:3001/api/products?categoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        if (data.length > 0) {
          setCategoryName(
            data[0].categoryId?.title || "Category Products"
          );
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // const handleBuyNow = (product) => {
  //   addToCart({
  //     ...product,
  //     quantity: 1,
  //   });

  //   navigate("/checkout");
  // };

  return (
    <>
      <Navbar />

      <section className="category-products-page">

        <div className="category-products-container">

          <div className="category-products-header">

            <h1>{categoryName}</h1>

            <p>
              Browse all products available in this category.
            </p>

          </div>

          {products.length === 0 ? (

            <div className="category-empty">

              <h2>No Products Found</h2>

            </div>

          ) : (

            <div className="category-products-grid">

              {products.map((product) => (

                <div
                  className="category-product-card"
                  key={product._id}
                >

                  <div className="category-product-image">

                    <img
                      src={`http://localhost:3001/productuploads/${product.productImage}`}
                      alt={product.productTitle}
                    />

                  </div>

                  <div className="category-product-content">

                    <span className="category-name">

                      {product.categoryId?.title}

                    </span>

                    <h3>

                      {product.productTitle}

                    </h3>

                    <div className="category-price-row">

                      <span className="category-price">

                        Rs. {product.productPrice}

                      </span>

                      <span className="category-rating">

                        ★ 4.9

                      </span>

                    </div>

                    <div className="category-buttons">
                      
                                          {/* <button
                        className="category-buy-btn"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </button> */}

                      <button
  className="category-buy-btn"
  onClick={() => navigate(`/product/${product._id}`)}
>
  Buy Now
</button>

                      <button
                        className="category-cart-btn"
                        onClick={() =>
                          addToCart({
                            ...product,
                            quantity: 1,
                          })
                        }
                      >
                        🛒 Add to Cart
                      </button>

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

export default CategoryProducts;