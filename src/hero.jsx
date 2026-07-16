import { useState, useEffect } from "react";
import "./hero.css";
import CuratedCollections from "./CuratedCollections.jsx";
import Products from "./FeaturedProducts.jsx";
import HotSales from "./hotsales.jsx";
import Values from "./values.jsx";
import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx";
import DiscountOffers from "./DiscountOffers.jsx";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


function Hero() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
  fetch("http://localhost:3001/api/banners")
    .then((res) => res.json())
    .then((data) => setBanners(data))
    .catch((err) => console.log(err));
}, []);
  return (
    <>
    <Navbar/>
    <section className="hero-section-image">
  <div className="hero-container">

    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
      className="hero-swiper"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner._id}>
          <div className="hero-bg">
            <div
              className="hero-image"
              style={{
                backgroundImage: `url(http://localhost:3001/banneruploads/${banner.image})`,
              }}
            ></div>
            <div className="hero-overlay"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="hero-content">

      <div className="hero-buttons">

        <Link to="/products">
          <button className="shop-btn">
            Shop Now
          </button>
        </Link>

      </div>

    </div>

  </div>
</section>
    
    <CuratedCollections/>
    <DiscountOffers/>
    <Products/>
    <HotSales/>
    <Values/>
    <Footer/>
    <WhatsAppButton />
    </>
  );
}

export default Hero;