import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CuratedCollections.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function CuratedCollections() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  // const navigate = useNavigate();
  

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="collections">

      <div className="collections-header">

        <div>
          <h2>Curated Collections</h2>
          <p>
            Explore our diverse range of flash-frozen essentials.
          </p>
        </div>

            <button
            className="view-btn"
            onClick={() => navigate("/categories")}
            
>
          View All Categories
          
        </button>

      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
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
            <div className="collection-card">

              <img
                src={`http://localhost:3001/uploads/${item.image}`}
                alt={item.title}
              />

              <div className="overlay"></div>

              <div className="content">
                <h3>{item.title}</h3>

                <button
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