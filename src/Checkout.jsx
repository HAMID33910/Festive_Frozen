import { useState, useContext } from "react";
import "./checkout.css";
import { CartContext } from "./CartContext";
import { FiTrash2 } from "react-icons/fi";
import Navbar from "./navbar.jsx"
import Footer from "./footer.jsx"

function Checkout() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const [payment] = useState("cod");

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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     console.log({
//       customer: form,
//       paymentMethod: payment,
//       products: cartItems,
//       total,
//     });

//     alert("Order Placed Successfully!");

//     clearCart();

//     setForm({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       address: "",
//       postalCode: "",
//     });
//   };

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
      productId: item._id,
      productTitle: item.productTitle,
      productImage: item.productImage,
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

    alert("Order Placed Successfully!");

    clearCart();

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
    });

    console.log(data);

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
                  key={item._id}
                >

                  <img
                    src={`http://localhost:3001/productuploads/${item.productImage}`}
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
                          decreaseQuantity(item._id)
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
                          increaseQuantity(item._id)
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
                      removeFromCart(item._id)
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
    </>
  );
}

export default Checkout;