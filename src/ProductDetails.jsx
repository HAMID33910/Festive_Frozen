import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, addToWishlist, setShowLoginModal } = useContext(CartContext);

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
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    const savedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (savedUser?.id) {
      navigate("/checkout");
    } else {
      setShowLoginModal(true);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="text-center py-20">
          <h2 className="text-2xl text-on-surface-variant">Loading Product...</h2>
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="text-center py-20">
          <h2 className="text-2xl text-on-surface-variant">Product Not Found</h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="py-12 px-6 max-w-[1280px] mx-auto">

        <div className="grid grid-cols-2 gap-10 max-[768px]:grid-cols-1">

          {/* LEFT SIDE */}

          <div>

            <div className="relative rounded-2xl overflow-hidden">

              <img
                src={`http://localhost:3001/productuploads/${product.productImage}`}
                alt={product.productTitle}
                className="w-full h-auto object-cover"
              />

              <div className="absolute top-3.5 right-3.5">
                <button onClick={() => addToWishlist(product)} aria-label="Add to wishlist" className="w-10 h-10 border-none rounded-full bg-surface/90 text-primary cursor-pointer text-lg transition-all duration-300 hover:bg-primary hover:text-white">♥</button>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col">

            <span className="text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
              {product.categoryId?.title || "Frozen Food"}
            </span>

            <h1 className="font-display text-3xl font-bold text-on-surface mb-3">{product.productTitle}</h1>

            <div className="text-star mb-4 text-lg">
              ★★★★★
              <span className="text-sm text-on-surface-variant ml-2">(4.9 Rating)</span>
            </div>

            <div className="text-3xl font-bold text-primary mb-4">
              Rs. {product.productPrice}
            </div>

            <p className="text-on-surface-variant mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">

              {product.stock > 0 ? (
                <span className="text-success-green font-semibold">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-error-light font-semibold">
                  Out of Stock
                </span>
              )}

            </div>

            <div className="flex items-center gap-4 mb-6">

              <button className="w-10 h-10 rounded-lg border border-outline-variant bg-white cursor-pointer text-lg font-bold hover:bg-surface-container" onClick={decreaseQty}>
                -
              </button>

              <span className="text-lg font-semibold min-w-[40px] text-center">{quantity}</span>

              <button className="w-10 h-10 rounded-lg border border-outline-variant bg-white cursor-pointer text-lg font-bold hover:bg-surface-container" onClick={increaseQty}>
                +
              </button>

            </div>

            <div className="flex gap-3 mb-6">

              <button
                className="flex-1 bg-card-warm text-on-surface border-none py-3 rounded-lg cursor-pointer font-semibold hover:bg-primary hover:text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="flex-1 bg-primary text-white border-none py-3 rounded-lg cursor-pointer font-semibold hover:bg-primary-dark"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

            </div>
                        <div className="bg-surface-container-low rounded-xl p-5 mb-6">

              <div className="flex justify-between py-2 border-b border-outline-variant/50 last:border-b-0">
                <h4 className="text-sm font-semibold text-on-surface-variant">Category</h4>
                <p className="text-sm text-on-surface">
                  {product.categoryId?.title || "Frozen Food"}
                </p>
              </div>

              <div className="flex justify-between py-2 border-b border-outline-variant/50 last:border-b-0">
                <h4 className="text-sm font-semibold text-on-surface-variant">Availability</h4>
                <p className="text-sm text-on-surface">
                  {product.stock > 0
                    ? "Available"
                    : "Out of Stock"}
                </p>
              </div>

              <div className="flex justify-between py-2 border-b border-outline-variant/50 last:border-b-0">
                <h4 className="text-sm font-semibold text-on-surface-variant">Delivery</h4>
                <p className="text-sm text-on-surface">Delivery in 1–3 working days.</p>
              </div>

            </div>

            <div className="mb-8">

              <h3 className="font-display text-xl font-bold text-on-surface mb-3">Why You'll Love It</h3>

              <ul className="list-none p-0 m-0">
                <li className="py-1.5 text-on-surface-variant">Premium quality frozen food.</li>
                <li className="py-1.5 text-on-surface-variant">Freshly packed and hygienically processed.</li>
                <li className="py-1.5 text-on-surface-variant">Rich taste with long shelf life.</li>
                <li className="py-1.5 text-on-surface-variant">Perfect for quick family meals.</li>
                <li className="py-1.5 text-on-surface-variant">Stored at optimum freezing temperature.</li>
              </ul>

            </div>

          </div>

        </div>

        {relatedProducts.length > 0 && (

          <div className="mt-16">

            <h2 className="font-display text-2xl font-bold text-on-surface mb-6">Related Products</h2>

            <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">

              {relatedProducts.map((item) => (

                <div
                  className="bg-white rounded-xl p-4 shadow-card text-center"
                  key={item._id}
                >

                  <img
                    src={`http://localhost:3001/productuploads/${item.productImage}`}
                    alt={item.productTitle}
                    className="w-full h-[180px] object-cover rounded-lg mb-3"
                  />

                  <h4 className="font-display text-base text-on-surface mb-1">{item.productTitle}</h4>

                  <p className="text-primary font-bold mb-3">
                    Rs. {item.productPrice}
                  </p>

                  <button
                    className="bg-primary text-white border-none py-2 px-4 rounded-lg cursor-pointer text-sm font-semibold hover:bg-primary-dark"
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
