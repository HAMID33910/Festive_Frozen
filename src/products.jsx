import { useEffect, useState } from "react";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);

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

        <button>
          See All
        </button>
      </div>


      <div className="products-grid">

        {products.map((product) => (

          <div className="product-card" key={product._id}>

            <div className="product-image">

              <img
                src={`http://localhost:3001/productuploads/${product.productImage}`}
                alt={product.productTitle}
              />


              <div className="wishlist-overlay">
                <button>
                  ♥
                </button>
              </div>

            </div>



            <div className="product-content">


              <span className="category">
                Frozen Food • 500g
              </span>


              <h3>
                {product.productTitle}
              </h3>



              <div className="product-bottom">


                <div className="price-rating">

                  <span className="price">
                    ${product.productPrice}
                  </span>


                  <div className="rating">
                    ★
                    <span>4.9</span>
                  </div>

                </div>



                <div className="actions">

                  <button className="buy-btn">
                    Buy Now
                  </button>


                  <button className="cart-btn">
                    🛒
                  </button>

                </div>


              </div>


            </div>


          </div>

        ))}


      </div>

    </section>
  );
}


export default Products;