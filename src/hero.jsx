import { useState, useEffect } from "react";
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
    <section className="w-full box-border">
  <div className="relative w-full max-w-[1400px] h-[520px] mx-auto overflow-hidden max-[1200px]:h-[420px] max-[992px]:h-[380px] max-[768px]:h-[340px] max-[480px]:h-[300px] max-[360px]:h-[260px]">

    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
      className="w-full h-full"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner._id}>
          <div className="relative w-full h-full">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat block"
              style={{
                backgroundImage: `url(http://localhost:3001/banneruploads/${banner.image})`,
              }}
            ></div>
            <div className="absolute inset-0 z-[2] pointer-events-none bg-[linear-gradient(160deg,rgba(20,20,20,0.55)_0%,transparent_50%),linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.15)_40%,transparent_65%)]"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="absolute bottom-0 left-0 w-full z-[10] px-14 pb-12 pt-10 flex flex-col justify-end items-center box-border pointer-events-none max-[992px]:px-9 max-[992px]:py-9 max-[480px]:px-5 max-[480px]:py-6 max-[360px]:px-4 max-[360px]:py-5 [&_*]:pointer-events-auto">

      <div className="flex flex-row gap-[18px] flex-nowrap max-[768px]:gap-2.5 max-[480px]:gap-2 max-[360px]:gap-2">

        <Link to="/products">
          <button className="relative py-[17px] px-[38px] text-[15px] font-semibold font-display rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2.5 no-underline whitespace-nowrap tracking-[0.4px] overflow-hidden bg-white text-[#1a1a1a] border-2 border-white animate-slide-up opacity-0 hover:bg-[#642b09] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] max-[1200px]:py-[15px] max-[1200px]:px-8 max-[1200px]:text-sm max-[992px]:py-[13px] max-[992px]:px-[26px] max-[992px]:text-[13px] max-[768px]:py-[11px] max-[768px]:px-5 max-[768px]:text-xs max-[480px]:py-2.5 max-[480px]:px-4 max-[480px]:text-[11px] max-[360px]:py-2 max-[360px]:px-3.5 max-[360px]:text-[11px]">
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
