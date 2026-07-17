import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { CartContext } from "./CartContext";
import { FiTrash2, FiCheck, FiCopy, FiCheckCircle } from "react-icons/fi";
import Navbar from "./navbar.jsx"
import Footer from "./footer.jsx"
import TrackOrder from "./TrackOrder.jsx"

function Checkout() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [payment] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.productPrice) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOrderContinue = () => {
    clearCart();
    setOrderSuccess(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
    });
    navigate("/TrackOrder");
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const orderData = {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,
    address: form.address,
    postalCode: form.postalCode,
    paymentMethod: "Cash On Delivery",

    items: cartItems.map((item) => ({
      // productId: item._id,
      // productTitle: item.productTitle,
      // productImage: item.productImage,
      // quantity: item.quantity,
      // price: Number(item.productPrice),
      productId: item.productId,
  productTitle: item.productTitle,
  productImage: item.productImage,
  imageType: item.imageType || "product",
  quantity: item.quantity,
  price: Number(item.productPrice),
    })),

    totalPrice: total,
  };

  try {

    const res = await fetch(
      "http://localhost:3001/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

   setOrderSuccess({
     orderId: data.orderId,
     total: total,
     items: cartItems.length,
     name: `${form.firstName} ${form.lastName}`,
   });

  } catch (err) {

    console.log(err);

    alert("Failed to place order.");

  }
};

  return (
    <>
    <Navbar/>
    <section className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-left">

          <div className="checkout-header">

            <h2>Checkout</h2>

            <p>
              Please fill in your delivery details.
            </p>

          </div>

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <div className="checkout-grid">

              <div className="checkout-field">

                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="checkout-field">

                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="checkout-field">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="checkout-field">

                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="checkout-field checkout-full">

                <label>Address</label>

                <textarea
                  rows="5"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="checkout-field">

                <label>Postal Code</label>

                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="payment-box">

              <h3>Payment Method</h3>

              <label className="payment-option">

                <input
                  type="radio"
                  checked
                  readOnly
                />

                Cash on Delivery

              </label>

            </div>

            <button
              className="place-order-btn"
              type="submit"
            >
              Place Order
            </button>

          </form>

        </div>

        <div className="checkout-right">

          <h2>Your Order</h2>

          {cartItems.length === 0 ? (

            <div className="checkout-empty">

              <h3>Your cart is empty</h3>

            </div>

          ) : (

            <>

              {cartItems.map((item) => (

                <div
                  className="checkout-product"
                  key={item.productId}
                >


                  <img
  src={
  item.imageType === "deal"
    ? `http://localhost:3001/dealuploads/${item.productImage}`
    : `http://localhost:3001/productuploads/${item.productImage}`
}
  alt={item.productTitle}
/>

                  <div className="checkout-product-info">

                    <h4>{item.productTitle}</h4>

                    <p>
                      Rs. {item.productPrice}
                    </p>

                    <div className="checkout-qty">

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.productId)
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.productId)
                        }
                      >
                        +
                      </button>

                    </div>

                    <strong>

                      Rs.{" "}

                      {(
                        Number(item.productPrice) *
                        item.quantity
                      ).toLocaleString()}

                    </strong>

                  </div>

                  <button
                    className="checkout-delete"
                    type="button"
                    onClick={() =>
                      removeFromCart(item.productId)
                    }
                  >

                    <FiTrash2 />

                  </button>

                </div>

              ))}

              <div className="checkout-total">

                <span>Total</span>

                <strong>
                  Rs. {total.toLocaleString()}
                </strong>

              </div>

            </>

          )}

        </div>

      </div>

    </section>
    <Footer/>

    {orderSuccess && (
      <div className="order-success-overlay">
        <div className="order-success-modal">
          <div className="order-success-icon">
            <FiCheckCircle />
          </div>
          <h2>Order Placed Successfully!</h2>
          <p className="order-success-msg">Thank you, {orderSuccess.name}. Your order has been confirmed.</p>

          <div className="order-success-details">
            <div className="order-success-row">
              <span>Order ID</span>
              <div className="order-success-id">
                <strong>{orderSuccess.orderId}</strong>
                <button
                  className="order-copy-btn"
                  onClick={() => handleCopyOrderId(orderSuccess.orderId)}
                  title="Copy Order ID"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
            <div className="order-success-row">
              <span>Items</span>
              <strong>{orderSuccess.items}</strong>
            </div>
            <div className="order-success-row">
              <span>Total</span>
              <strong>Rs. {orderSuccess.total.toLocaleString()}</strong>
            </div>
            <div className="order-success-row">
              <span>Payment</span>
              <strong>Cash On Delivery</strong>
            </div>
          </div>

          <p className="order-success-note">Please save your Order ID to track your order.</p>

          <button className="order-success-btn" onClick={handleOrderContinue}>
            Track My Order
          </button>
        </div>
      </div>
    )}
    </>
  );
}

export default Checkout;