import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
// import { useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

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

      <section className="py-16 px-6 max-w-[1280px] mx-auto max-sm:py-10 max-sm:px-4">

        <div className="text-center mb-10">

          <h1 className="font-display text-4xl font-bold text-primary mb-2 max-sm:text-3xl">{categoryName}</h1>

          <p className="text-on-surface-variant">
            Browse all products available in this category.
          </p>

        </div>

        {products.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl text-on-surface-variant">No Products Found</h2>

          </div>

        ) : (

          <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">

            {products.map((product) => (

              <div
                className="bg-white rounded-2xl overflow-hidden shadow-card transition-transform duration-300 hover:-translate-y-1.5"
                key={product._id}
              >

                <div className="h-[200px] overflow-hidden">

                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:3001/productuploads/${product.productImage}`}
                    alt={product.productTitle}
                  />

                </div>

                <div className="p-4">

                  <span className="text-xs font-semibold text-on-surface-variant mb-1.5">

                    {product.categoryId?.title}

                  </span>

                  <h3 className="font-display text-lg text-on-surface mb-3">

                    {product.productTitle}

                  </h3>

                  <div className="flex justify-between items-center mb-4">

                    <span className="text-lg font-bold text-primary">

                      Rs. {product.productPrice}

                    </span>

                    <span className="text-sm text-primary-container">

                      ★ 4.9

                    </span>

                  </div>

                  <div className="flex gap-2.5">
                    
                                        {/* <button
                      className="category-buy-btn"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button> */}

                    <button
                      className="flex-1 bg-primary text-white border-none py-2.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-primary-dark"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      Buy Now
                    </button>

                    <button
                      className="flex-1 bg-card-warm text-on-surface-variant border-none py-2.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-primary hover:text-white"
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

      </section>

      <Footer />

    </>
  );
}

export default CategoryProducts;
