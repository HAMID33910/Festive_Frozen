import { useEffect, useState } from "react";
import "./HotSales.css";

function HotSales() {

  const [products, setProducts] = useState([]);


  useEffect(() => {

    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

  }, []);



  return (

    <section className="hot-sales-section">


      <div className="hot-sales-container">


        <div className="hot-sales-header">

          <h2>
            Hot Sales This Week
          </h2>


          <div className="slider-buttons">

            <button>
              ‹
            </button>

            <button>
              ›
            </button>

          </div>


        </div>



        <div className="hot-products-grid">


          {products.map((product)=>(


            <div className="hot-product-card" key={product._id}>


              <div className="hot-product-image">


                <img
                  src={`http://localhost:3001/productuploads/${product.productImage}`}
                  alt={product.productTitle}
                />



                <div className="sale-badge">
                  SALE
                </div>



                <div className="hot-wishlist">

                  <button>
                    ♥
                  </button>

                </div>


              </div>




              <div className="hot-product-content">


                <span className="hot-category">
                  Frozen Food • 500g
                </span>



                <h3>
                  {product.productTitle}
                </h3>



                <div className="hot-bottom">


                  <div className="hot-price-rating">


                    <span className="hot-price">

                      ${product.productPrice}

                    </span>



                    <div className="hot-rating">

                      ★

                      <span>
                        4.8
                      </span>

                    </div>


                  </div>



                  <div className="hot-actions">


                    <button className="hot-buy">

                      Buy Now

                    </button>



                    <button className="hot-cart">

                      🛒

                    </button>


                  </div>



                </div>



              </div>



            </div>


          ))}



        </div>



      </div>


    </section>

  );

}


export default HotSales;