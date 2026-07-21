import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { CartContext } from "./CartContext";

import "swiper/css";

function DiscountOffers() {
  const [offers, setOffers] = useState([]);

  const { addToWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/deals")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="max-w-[1280px] mx-auto py-[60px] px-6 max-[900px]:py-10 max-[600px]:py-10 max-[600px]:px-4">

      <div className="flex justify-between items-center gap-5 mb-7 max-[900px]:flex-col max-[900px]:items-start max-[900px]:mb-6">

        <h2 className="font-display text-[34px] text-primary font-bold m-0 max-[900px]:text-[30px] max-[600px]:text-[26px]">Discount Offers</h2>

        <button
          className="relative border-none bg-transparent text-primary text-[15px] font-bold cursor-pointer p-0 transition-colors duration-300 hover:text-primary-dark group"
          onClick={() => navigate("/offers")}
        >
          <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
          View All
        </button>

      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={4}
        loop={true}
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
        {offers.map((item) => (

          <SwiperSlide key={item._id}>

            <div className="bg-surface-container rounded-2xl overflow-hidden shadow-card-brand transition-all duration-300 h-full flex flex-col hover:-translate-y-1.5">

              <div className="relative h-[230px] overflow-hidden bg-surface-container-low max-[600px]:h-[220px] max-[380px]:h-[200px]">

                <img
                  src={`http://localhost:3001/dealuploads/${item.dealImage}`}
                  alt={item.dealName}
                  className="w-full h-full object-cover transition-transform duration-[0.45s] hover:scale-105"
                />

                <div className="absolute top-3.5 left-3.5 bg-primary text-white py-[7px] px-3.5 rounded-[30px] text-xs font-bold">
                  {item.discount}% OFF
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <button onClick={() => addToWishlist({ _id: item._id, productTitle: item.dealName, productPrice: item.discountedPrice, productImage: item.dealImage, imageType: "deal" })} aria-label="Add to wishlist" className="w-10 h-10 border-none rounded-full bg-surface/90 text-primary cursor-pointer text-lg transition-all duration-300 hover:bg-primary hover:text-white">♥</button>
                </div>

              </div>

              <div className="p-[18px] flex flex-col flex-1 max-[600px]:p-4">

                <span className="text-xs text-on-surface-variant font-semibold mb-1.5">
                  Limited Time Offer
                </span>

                <h3 className="m-0 mb-3.5 text-[22px] text-on-surface font-display leading-[1.3] max-[600px]:text-xl">{item.dealName}</h3>

                <div className="flex items-center gap-2.5 mb-[18px]">

                  <span className="text-gray-400 line-through text-[15px]">
                    Rs. {item.originalPrice}
                  </span>

                  <span className="text-primary text-[21px] font-bold">
                    Rs. {item.discountedPrice}
                  </span>

                </div>

                <div className="flex items-center gap-1 text-sm text-on-surface-variant">

                  <small>
                    {new Date(item.startDate).toLocaleDateString()}
                  </small>

                  <span> - </span>

                  <small>
                    {new Date(item.endDate).toLocaleDateString()}
                  </small>

                </div>

                <div className="flex items-center gap-2.5 mt-auto">

                  <button
  className="flex-1 border-none bg-primary text-white py-3 rounded-lg cursor-pointer text-[15px] font-semibold transition-colors duration-300 hover:bg-primary-dark max-[380px]:text-sm"
  onClick={() => navigate(`/deal/${item._id}`)}
>
  View Deal
</button>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}
      </Swiper>

    </section>
  );
}

export default DiscountOffers;
