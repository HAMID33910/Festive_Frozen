import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function CuratedCollections() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="max-w-[1280px] mx-auto py-[60px] px-6 max-[600px]:py-10 max-[600px]:px-4">

      <div className="flex justify-between items-center gap-5 mb-7 max-[900px]:flex-col max-[900px]:items-start max-[900px]:mb-6">

        <div>
          <h2 className="font-display text-[34px] font-bold text-primary m-0 max-[900px]:text-[30px] max-[600px]:text-[26px]">Curated Collections</h2>
          <p className="mt-2 text-base text-on-surface-muted leading-relaxed max-[600px]:text-[15px]">
            Explore our diverse range of flash-frozen essentials.
          </p>
        </div>

            <button
            className="relative border-none outline-none bg-transparent text-primary font-bold text-[15px] cursor-pointer p-0 no-underline transition-colors duration-300 hover:text-primary-dark group"
            onClick={() => navigate("/categories")}
            
>
          <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
          View All Categories
          
        </button>

      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={18}
        loop={categories.length > 4}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={true}
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
        {categories.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative overflow-hidden rounded-[22px] aspect-[3/4] cursor-pointer bg-primary shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-[0.35s] hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(143,63,22,0.18)]">

              <img
                src={`${API_URL}/uploads/${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[0.6s] hover:scale-105"
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0)_100%)] z-[1]"></div>

              <div className="absolute top-6 left-6 right-6 bottom-6 z-[2] flex flex-col items-start justify-between max-[600px]:left-4 max-[600px]:right-4 max-[600px]:bottom-4">
                <h3 className="inline-flex items-center text-white font-display text-[13px] font-bold tracking-[0.5px] uppercase py-[10px] px-[22px] rounded-full bg-white/12 backdrop-blur-[14px] border border-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.15)] m-0 transition-all duration-300 hover:bg-white/22 hover:border-white/45 hover:-translate-y-0.5 max-[380px]:text-xs max-[380px]:py-2 max-[380px]:px-4 max-[600px]:py-[10px] max-[600px]:px-5 max-[600px]:text-[13px]">{item.title}</h3>

                <button
                  className="border-none py-[13px] px-[28px] rounded-full bg-white text-[#1a1a1a] font-display text-[13px] font-bold tracking-[0.3px] cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-primary-container hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(184,91,43,0.4)] active:translate-y-0 max-[380px]:py-2 max-[380px]:px-4 max-[380px]:text-xs max-[600px]:py-[10px] max-[600px]:px-5 max-[600px]:text-[13px]"
                  onClick={() =>
                    navigate(`/category/${item._id}`)
                  }
                >
                  Explore
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

export default CuratedCollections;
