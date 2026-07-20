import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
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
    <section className="max-w-[1280px] mx-auto py-[60px] px-6 bg-surface-container-low max-[900px]:py-10 max-[600px]:py-10 max-[600px]:px-4">
      <div>
        <div className="flex justify-between items-center gap-5 mb-7 max-[900px]:flex-col max-[900px]:items-start max-[900px]:mb-6">

    <div>
        <h2 className="font-display text-[34px] font-bold text-primary m-0 leading-[1.2] max-[900px]:text-[30px] max-[600px]:text-[26px]">Hot Sales</h2>
        <p className="mt-2 text-base text-on-surface-muted leading-relaxed max-[600px]:text-[15px]">Discover our hottest selling frozen products at unbeatable prices.</p>
    </div>

    <button className="relative border-none bg-transparent text-primary text-[15px] font-bold cursor-pointer p-0 transition-colors duration-300 hover:text-primary-dark group" onClick={() => navigate("/HotSalesPage")}>
        <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        View All
    </button>

</div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={4}
          loop={products.length > 4}
          allowTouchMove={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
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
              <div className="w-full max-w-[310px] mx-auto bg-white rounded-2xl overflow-hidden flex flex-col shadow-card transition-all duration-300 hover:-translate-y-1.5">
                <div className="relative h-[230px] overflow-hidden bg-gray-100 max-[600px]:h-[220px] max-[380px]:h-[200px]">
                  <img
                    src={`http://localhost:3001/productuploads/${product.productImage}`}
                    alt={product.productTitle}
                    className="w-full h-full object-cover transition-transform duration-[0.45s] hover:scale-105"
                  />

                  <div className="absolute top-3.5 left-3.5 bg-sale text-white py-[7px] px-3.5 rounded-[30px] text-xs font-bold">HOT</div>

                  <div className="absolute top-3.5 right-3.5">
                    <button onClick={() => addToWishlist(product)} aria-label="Add to wishlist" className="w-10 h-10 border-none rounded-full bg-white/95 text-primary font-[18px] cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white">♥</button>
                  </div>
                </div>

                <div className="p-[18px] flex flex-col flex-1 max-[600px]:p-4">
                  <span className="text-primary text-[13px] font-semibold mb-1.5">
                    {product.categoryId?.title || "Frozen Food"}
                  </span>

                  <h3 className="m-0 mb-4 text-[22px] text-[#222] leading-[1.35] font-display max-[600px]:text-xl">{product.productTitle}</h3>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-[18px]">
                      <span className="text-primary text-[21px] font-bold">
                        Rs. {product.productPrice}
                      </span>

                      <div className="flex items-center gap-1 text-star">
                        ★ <span className="text-[#444]">4.9</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        className="flex-1 border-none bg-primary text-white py-3 rounded-lg cursor-pointer text-[15px] font-semibold transition-colors duration-300 hover:bg-primary-dark max-[380px]:text-sm"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </button>

                      <button
                        className="w-[46px] min-w-[46px] h-[46px] border-none rounded-lg bg-card-warm text-on-surface-variant flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white max-[380px]:w-[44px] max-[380px]:min-w-[44px] max-[380px]:h-[44px]"
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
      </div>
    </section>
  );
}

export default HotSales;
