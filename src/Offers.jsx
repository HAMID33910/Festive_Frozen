import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";
import "./offer.css";
import WhatsAppButton from "./WhatsAppButton";

function Offers() {
  const [offers, setOffers] = useState([]);

  const { addToCart, setShowLoginModal } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/deals")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

 const handleBuyNow = (offer) => {
  addToCart({
    _id: offer._id,
    productTitle: offer.dealName,
    productPrice: offer.discountedPrice,
    productImage: offer.dealImage,
    quantity: 1,
    imageType: "deal",
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

      <section className="offers-page">
        <div className="offers-container">

          <div className="offers-header">
            <h1>Discount Offers</h1>

            <p>
              Discover our latest discounted frozen food offers.
            </p>
          </div>

          {offers.length === 0 ? (
            <div className="offers-empty">
              <h3>No Offers Available</h3>
            </div>
          ) : (
            <div className="offers-grid">

              {offers.map((offer) => (

                <div
                  className="offer-card"
                  key={offer._id}
                >

                  <div className="offer-image">

                    <img
                      src={`http://localhost:3001/dealuploads/${offer.dealImage}`}
                      alt={offer.dealName}
                    />

                    <span className="offer-badge">
                      {offer.discount}% OFF
                    </span>

                  </div>

                  <div className="offer-content">

                    <span className="offer-tag">
                      Limited Time Offer
                    </span>

                    <h2>{offer.dealName}</h2>

                    <div className="offer-price">

                      <span className="old-price">
                        Rs. {offer.originalPrice}
                      </span>

                      <span className="new-price">
                        Rs. {offer.discountedPrice}
                      </span>

                    </div>

                    <div className="offer-date">

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

                    <div className="offer-actions">

  <button
    className="offer-buy-btn"
    onClick={() => handleBuyNow(offer)}
  >
    Buy Now
  </button>

  <button
    className="offer-cart-btn"
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

        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Offers;