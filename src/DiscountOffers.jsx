import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./DiscountOffers.css";

function DiscountOffers() {
  const [offers, setOffers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/deals")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="discount-section">

      <div className="discount-header">

        <h2>Discount Offers</h2>

        <button
          onClick={() => navigate("/offers")}
        >
          View All
        </button>

      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
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

            <div className="discount-card">

              <div className="discount-image">

                <img
                  src={`http://localhost:3001/dealuploads/${item.dealImage}`}
                  alt={item.dealName}
                />

                <div className="discount-badge">
                  {item.discount}% OFF
                </div>

              </div>

              <div className="discount-content">

                <span className="discount-category">
                  Limited Time Offer
                </span>

                <h3>{item.dealName}</h3>

                <div className="discount-price-box">

                  <span className="discount-old-price">
                    Rs. {item.originalPrice}
                  </span>

                  <span className="discount-new-price">
                    Rs. {item.discountedPrice}
                  </span>

                </div>

                <div className="discount-dates">

                  <small>
                    {new Date(item.startDate).toLocaleDateString()}
                  </small>

                  <span> - </span>

                  <small>
                    {new Date(item.endDate).toLocaleDateString()}
                  </small>

                </div>

                <div className="discount-actions">

                  <button
  className="discount-buy-btn"
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