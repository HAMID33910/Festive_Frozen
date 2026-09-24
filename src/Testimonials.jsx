import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonialsData = [
  {
    id: 1,
    name: "Fatima Zainab",
    role: "Verified Buyer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    review: "The Chicken Seekh Kababs are a lifesaver for dinner! Flash frozen so the flavor stays 100% juicy and authentic.",
    favoriteItem: "Roasted Chicken",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Muhammad Hamza",
    role: "Verified Buyer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    review: "Ordered the Crispy Chicken Nuggets & Beef Shami Kababs for morning breakfast. Eco-insulated packaging kept everything perfectly frozen!",
    favoriteItem: "Crispy Chicken Nuggets",
    date: "5 days ago"
  },
  {
    id: 3,
    name: "Ayesha Malik",
    role: "Food Blogger",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    review: "Clean ingredients without artificial preservatives. My kids absolutely love the Vegetable Samosas for evening tea time.",
    favoriteItem: "Macroni Samosi",
    date: "1 week ago"
  },
  {
    id: 4,
    name: "Bilal Chaudhry",
    role: "Verified Buyer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    review: "Peshawari Chapli Kabab tastes just like traditional restaurant food! Delivery was super fast in insulated boxes. Will order again.",
    favoriteItem: "Daal Kabab",
    date: "2 weeks ago"
  },
  {
    id: 5,
    name: "Zainab Raza",
    role: "Verified Buyer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    review: "Festive Frozen has solved all my dinner prep worries. High quality frozen items, hygienic preparation, and great taste!",
    favoriteItem: "Chicken Kofta",
    date: "3 weeks ago"
  }
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-amber-50/50 via-orange-50/20 to-white max-md:py-12 max-md:px-4 border-t border-amber-900/10">
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 max-md:mb-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#642b09]/10 text-[#642b09] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-sm">stars</span>
            Customer Favorites
          </span>
          <h2 className="font-display text-4xl font-bold text-[#642b09] leading-tight max-md:text-3xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed max-md:text-sm">
            Over 10,000+ happy customers trust Festive Frozen for premium, chef-curated frozen delights.
          </p>

          {/* Aggregate Rating Badge */}
          <div className="inline-flex items-center gap-3 mt-6 px-6 py-2.5 rounded-full bg-white shadow-sm border border-amber-900/15">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-xl fill-current">
                  star
                </span>
              ))}
            </div>
            <span className="font-bold text-[#642b09] text-sm">4.9 / 5.0</span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-gray-600 text-xs font-medium">500+ Verified Reviews</span>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative pb-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active !bg-[#642b09] !w-6 !rounded-full",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full py-4 px-2"
          >
            {testimonialsData.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="h-full bg-white rounded-2xl p-7 border border-amber-900/10 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  
                  {/* Top Quote & Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-lg">
                            star
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        {item.role}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Favorite Item Tag & Author */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                    <div className="flex items-center gap-2 bg-amber-50/70 px-3 py-1.5 rounded-lg border border-amber-900/10">
                      <span className="material-symbols-outlined text-amber-700 text-base">
                        restaurant_menu
                      </span>
                      <span className="text-xs font-semibold text-[#642b09]">
                        Favorite: <span className="font-normal text-gray-700">{item.favoriteItem}</span>
                      </span>
                    </div>

                    {/* Author Details */}
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-amber-900/20 shadow-xs"
                      />
                      <div className="flex flex-col">
                        <h4 className="font-bold text-sm text-[#642b09] leading-tight">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
