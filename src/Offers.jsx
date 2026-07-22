import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { API_URL } from "./config";
import Navbar from "./Navbar";
import Footer from "./footer";
import WhatsAppButton from "./WhatsAppButton";

function Offers() {
  const [offers, setOffers] = useState([]);

  const { addToCart, addToWishlist, setShowLoginModal } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/deals`)
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

 const handleBuyNow = (offer) => {
  navigate(`/Deal/${offer._id}`);
 };

  const handleAddToCart = (offer) => {
  addToCart({
    _id: offer._id,
    productTitle: offer.dealName,
    productPrice: offer.discountedPrice,
    productImage: offer.dealImage,
    quantity: 1,
    imageType: "deal", // IMPORTANT
  });
};

  return (
    <>
      <Navbar />

      <section className="py-16 px-6 max-w-[1280px] mx-auto">

          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-primary mb-2">Discount Offers</h1>

            <p className="text-on-surface-variant">
              Discover our latest discounted frozen food offers.
            </p>
          </div>

          {offers.length === 0 ? (
            <div className="text-center py-20">
              <h3>No Offers Available</h3>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">

              {offers.map((offer) => (

                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-card transition-transform duration-300 hover:-translate-y-1.5 flex flex-col"
                  key={offer._id}
                >

                  <div className="relative h-[230px] overflow-hidden">

                    <img
                      src={`${API_URL}/dealuploads/${offer.dealImage}`}
                      alt={offer.dealName}
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute top-3.5 left-3.5 bg-primary text-white py-[7px] px-3.5 rounded-[30px] text-xs font-bold">
                      {offer.discount}% OFF
                    </span>

                    <div className="absolute top-3.5 right-3.5">
                      <button onClick={() => addToWishlist({ _id: offer._id, productTitle: offer.dealName, productPrice: offer.discountedPrice, productImage: offer.dealImage, imageType: "deal" })} aria-label="Add to wishlist" className="w-10 h-10 border-none rounded-full bg-surface/90 text-primary cursor-pointer text-lg transition-all duration-300 hover:bg-primary hover:text-white">♥</button>
                    </div>

                  </div>

                  <div className="p-4 flex flex-col flex-1">

                    <span className="text-xs font-semibold text-on-surface-variant mb-1.5">
                      Limited Time Offer
                    </span>

                    <h2 className="font-display text-xl text-on-surface mb-3">{offer.dealName}</h2>

                    <div className="flex items-center gap-2.5 mb-4">

                      <span className="text-gray-400 line-through text-sm">
                        Rs. {offer.originalPrice}
                      </span>

                      <span className="text-primary text-xl font-bold">
                        Rs. {offer.discountedPrice}
                      </span>

                    </div>

                    <div className="flex items-center gap-1 text-sm text-on-surface-variant">

                      <small>
                        {new Date(
                          offer.startDate
                        ).toLocaleDateString()}
                      </small>

                      <span> - </span>

                      <small>
                        {new Date(
                          offer.endDate
                        ).toLocaleDateString()}
                      </small>

                    </div>

                    <div className="flex items-center gap-2.5 mt-auto">

  <button
    className="flex-1 bg-primary text-white border-none py-3 rounded-lg cursor-pointer text-sm font-semibold hover:bg-primary-dark"
    onClick={() => handleBuyNow(offer)}
  >
    Buy Now
  </button>

  <button
    className="w-[46px] min-w-[46px] h-[46px] border-none rounded-lg bg-card-warm flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white"
    onClick={() => handleAddToCart(offer)}
  >
    🛒
  </button>

</div>

                  </div>

                </div>

              ))}

            </div>
          )}

      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Offers;
