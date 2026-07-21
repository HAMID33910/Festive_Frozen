import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

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
    <>
    <Navbar />
    <section className="max-w-[1280px] mx-auto py-16 px-6 max-sm:py-10 max-sm:px-4">

      <div className="mb-8 max-sm:mb-6">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary mb-2 max-sm:text-3xl">Our Products</h1>
          <p className="text-on-surface-variant">
            Browse our complete collection of premium frozen foods.
          </p>
        </div>

        
      </div>

      <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">

        {products.map((product) => (
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-card transition-transform duration-300 hover:-translate-y-1.5 flex flex-col"
            key={product._id}
          >

            <div className="relative h-[230px] overflow-hidden bg-surface-container-low">

              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3001/productuploads/${product.productImage}`}
                alt={product.productTitle}
              />

              <div className="absolute top-3.5 right-3.5">
                <button onClick={() => addToWishlist(product)} aria-label="Add to wishlist" className="w-10 h-10 border-none rounded-full bg-surface/90 text-primary cursor-pointer text-lg transition-all duration-300 hover:bg-primary hover:text-white">♥</button>
              </div>

            </div>

            <div className="p-4 flex flex-col flex-1">

              <span className="text-xs font-semibold text-on-surface-variant mb-1.5">
                {product.categoryId?.title || "Frozen Food"}
              </span>

              <h3 className="font-display text-xl text-on-surface mb-3">{product.productTitle}</h3>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-primary">
                  Rs. {product.productPrice}
                </span>

                <span className="text-sm text-primary-container">
                  ★ 4.9
                </span>
              </div>

              <div className="flex items-center gap-2.5 mt-auto">

                <button className="flex-1 border-none bg-primary text-white py-3 rounded-lg cursor-pointer text-sm font-semibold hover:bg-primary-dark" onClick={() => navigate(`/product/${product._id}`)}>
                  Buy Now
                </button>

                <button
                  className="w-[46px] min-w-[46px] h-[46px] border-none rounded-lg bg-card-warm text-on-surface-variant flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white"
                  onClick={() => addToCart(product)}
                >
                  🛒 
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
    <Footer />
    </>
  );
}

export default Products;
