import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import Footer from "./footer";

function DealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, addToWishlist } = useContext(CartContext);

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
        <div className="text-center py-20 text-xl text-on-surface-variant">
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

      <section className="py-12 px-6 max-w-[1280px] mx-auto">

        <div className="grid grid-cols-2 gap-10 max-[768px]:grid-cols-1 mb-16">

          <div className="relative rounded-2xl overflow-hidden">

            <span className="absolute top-4 left-4 bg-primary text-white py-2 px-4 rounded-full text-sm font-bold z-10">
              {deal.discount}% OFF
            </span>

            <img
              src={`http://localhost:3001/dealuploads/${deal.dealImage}`}
              alt={deal.dealName}
              className="w-full h-auto object-cover"
            />

            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => addToWishlist({ _id: deal._id, productTitle: deal.dealName, productPrice: deal.discountedPrice, productImage: deal.dealImage })} aria-label="Add to wishlist" className="w-10 h-10 border-none rounded-full bg-surface/90 text-primary cursor-pointer text-lg transition-all duration-300 hover:bg-primary hover:text-white">♥</button>
            </div>

          </div>

          <div className="flex flex-col">

            <span className="text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
              Limited Time Offer
            </span>

            <h1 className="font-display text-3xl font-bold text-on-surface mb-3">{deal.dealName}</h1>

            <div className="text-star mb-4 text-lg">
              ★★★★★
              <span className="text-sm text-on-surface-variant ml-2">(4.9)</span>
            </div>

            <div className="flex items-center gap-4 mb-3">

              <h2 className="text-3xl font-bold text-primary">
                Rs. {deal.discountedPrice}
              </h2>

              <del className="text-gray-400 text-lg">
                Rs. {deal.originalPrice}
              </del>

            </div>

            <div className="bg-deal-saving/30 text-primary-dark py-2 px-4 rounded-lg font-semibold text-sm mb-4 inline-block">
              You Save Rs.
              {" "}
              {deal.originalPrice -
                deal.discountedPrice}
            </div>

            <div className="bg-primary text-white py-3 px-5 rounded-lg text-center font-bold text-lg mb-6">
              {timeLeft}
            </div>

            <div className="mb-6">

              <h3 className="font-display text-xl font-bold text-on-surface mb-3">Description</h3>

              <p className="text-on-surface-variant leading-relaxed">
                {deal.description ||
                  "Enjoy this amazing frozen food deal before the offer ends."}
              </p>

            </div>

            <div className="mb-6">

              <p className="text-sm text-on-surface-variant mb-1">

                <strong className="text-on-surface">Offer Starts :</strong>{" "}

                {new Date(
                  deal.startDate
                ).toLocaleDateString()}

              </p>

              <p className="text-sm text-on-surface-variant mb-1">

                <strong className="text-on-surface">Offer Ends :</strong>{" "}

                {new Date(
                  deal.endDate
                ).toLocaleDateString()}

              </p>

            </div>

            <div className="flex items-center gap-4 mb-6">

              <button
                className="w-10 h-10 rounded-lg border border-outline-variant bg-white cursor-pointer text-lg font-bold hover:bg-surface-container"
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span className="text-lg font-semibold min-w-[40px] text-center">{quantity}</span>

              <button
                className="w-10 h-10 rounded-lg border border-outline-variant bg-white cursor-pointer text-lg font-bold hover:bg-surface-container"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

            <div className="flex gap-3">

              <button
                className="flex-1 bg-primary text-white border-none py-3 rounded-lg cursor-pointer font-semibold hover:bg-primary-dark"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              <button
                className="flex-1 bg-card-warm text-on-surface border-none py-3 rounded-lg cursor-pointer font-semibold hover:bg-primary hover:text-white"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

            </div>

          </div>

        </div>

        <div className="mt-16">

          <h2 className="font-display text-2xl font-bold text-on-surface mb-6">Related Deals</h2>

          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">

            {relatedDeals
              .filter((item) => item._id !== deal._id)
              .slice(0, 4)
              .map((item) => (

                <div
                  className="bg-white rounded-xl p-4 shadow-card text-center cursor-pointer"
                  key={item._id}
                  onClick={() =>
                    navigate(`/deal/${item._id}`)
                  }
                >

                  <img
                    src={`http://localhost:3001/dealuploads/${item.dealImage}`}
                    alt={item.dealName}
                    className="w-full h-[180px] object-cover rounded-lg mb-3"
                  />

                  <h4 className="font-display text-base text-on-surface mb-1">{item.dealName}</h4>

                  <p className="text-primary font-bold">
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
