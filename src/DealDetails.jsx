import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";
import "./DealDetails.css";

function DealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [deal, setDeal] = useState(null);
  const [relatedDeals, setRelatedDeals] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/deals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDeal(data);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:3001/api/deals")
      .then((res) => res.json())
      .then((data) => {
        setRelatedDeals(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!deal) return;

    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(deal.endDate);

      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Offer Expired");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      setTimeLeft(`${days} Days ${hours} Hours Left`);
    }, 1000);

    return () => clearInterval(timer);
  }, [deal]);

  if (!deal) {
    return (
      <>
        <Navbar />
        <div className="deal-loading">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  const handleBuyNow = () => {
    addToCart({
      ...deal,
      productId: deal._id,
      productTitle: deal.dealName,
      productImage: deal.dealImage,
      productPrice: deal.discountedPrice,
      imageType: "deal",
      quantity,
    });

    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addToCart({
      ...deal,
      productId: deal._id,
      productTitle: deal.dealName,
      productImage: deal.dealImage,
      productPrice: deal.discountedPrice,
      imageType: "deal",
      quantity,
    });
  };

  return (
    <>
      <Navbar />

      <section className="deal-details-page">

        <div className="deal-details-container">

          <div className="deal-image-section">

            <span className="deal-discount-badge">
              {deal.discount}% OFF
            </span>

            <img
              src={`http://localhost:3001/dealuploads/${deal.dealImage}`}
              alt={deal.dealName}
            />

          </div>

          <div className="deal-info-section">

            <span className="deal-category">
              Limited Time Offer
            </span>

            <h1>{deal.dealName}</h1>

            <div className="deal-rating">
              ★★★★★
              <span>(4.9)</span>
            </div>

            <div className="deal-prices">

              <h2>
                Rs. {deal.discountedPrice}
              </h2>

              <del>
                Rs. {deal.originalPrice}
              </del>

            </div>

            <div className="deal-saving">
              You Save Rs.
              {" "}
              {deal.originalPrice -
                deal.discountedPrice}
            </div>

            <div className="deal-countdown">
              {timeLeft}
            </div>

            <div className="deal-description">

              <h3>Description</h3>

              <p>
                {deal.description ||
                  "Enjoy this amazing frozen food deal before the offer ends."}
              </p>

            </div>

            <div className="deal-dates">

              <p>

                <strong>Offer Starts :</strong>{" "}

                {new Date(
                  deal.startDate
                ).toLocaleDateString()}

              </p>

              <p>

                <strong>Offer Ends :</strong>{" "}

                {new Date(
                  deal.endDate
                ).toLocaleDateString()}

              </p>

            </div>

            <div className="deal-quantity">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

            <div className="deal-buttons">

              <button
                className="deal-buy-btn"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              <button
                className="deal-cart-btn"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

            </div>

          </div>

        </div>

        <div className="related-deals">

          <h2>Related Deals</h2>

          <div className="related-grid">

            {relatedDeals
              .filter((item) => item._id !== deal._id)
              .slice(0, 4)
              .map((item) => (

                <div
                  className="related-card"
                  key={item._id}
                  onClick={() =>
                    navigate(`/deal/${item._id}`)
                  }
                >

                  <img
                    src={`http://localhost:3001/dealuploads/${item.dealImage}`}
                    alt={item.dealName}
                  />

                  <h4>{item.dealName}</h4>

                  <p>
                    Rs. {item.discountedPrice}
                  </p>

                </div>

              ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default DealDetails;