import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { API_URL } from "./config";
import { FiTrash2, FiCheck, FiCopy, FiCheckCircle } from "react-icons/fi";
import Navbar from "./Navbar.jsx"
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
      `${API_URL}/api/orders`,
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
    <section className="py-12 px-6 max-w-[1280px] mx-auto">

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-8 max-[768px]:grid-cols-1">

        <div>

          <div className="mb-6">

            <h2 className="font-display text-2xl font-bold text-on-surface mb-1">Checkout</h2>

            <p className="text-on-surface-variant text-sm">
              Please fill in your delivery details.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
          >

            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">

              <div className="flex flex-col">

                <label className="text-sm font-semibold text-on-surface mb-1">First Name</label>

                <input
                  className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="flex flex-col">

                <label className="text-sm font-semibold text-on-surface mb-1">Last Name</label>

                <input
                  className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="flex flex-col">

                <label className="text-sm font-semibold text-on-surface mb-1">Email</label>

                <input
                  className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="flex flex-col">

                <label className="text-sm font-semibold text-on-surface mb-1">Phone Number</label>

                <input
                  className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="flex flex-col col-span-2 max-[600px]:col-span-1">

                <label className="text-sm font-semibold text-on-surface mb-1">Address</label>

                <textarea
                  className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                  rows="5"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="flex flex-col">

                <label className="text-sm font-semibold text-on-surface mb-1">Postal Code</label>

                <input
                  className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="bg-surface-container-low rounded-xl p-5 mt-6">

              <h3 className="text-lg font-semibold text-on-surface mb-3">Payment Method</h3>

              <label className="flex items-center gap-3 text-sm text-on-surface cursor-pointer">

                <input
                  type="radio"
                  checked
                  readOnly
                />

                Cash on Delivery

              </label>

            </div>

            <button
              className="w-full bg-primary text-white border-none py-3.5 rounded-lg font-semibold text-base cursor-pointer mt-6 hover:bg-primary-dark"
              type="submit"
            >
              Place Order
            </button>

          </form>

        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">

          <h2 className="font-display text-xl font-bold text-on-surface mb-4">Your Order</h2>

          {cartItems.length === 0 ? (

            <div className="text-center py-10">

              <h3 className="text-on-surface-variant">Your cart is empty</h3>

            </div>

          ) : (

            <>

              {cartItems.map((item) => (

                <div
                  className="flex gap-4 py-4 border-b border-cart-border"
                  key={item.productId}
                >


                  <img
  className="w-[80px] h-[80px] object-cover rounded-lg flex-shrink-0"
  src={
  item.imageType === "deal"
    ? `${API_URL}/dealuploads/${item.productImage}`
    : `${API_URL}/productuploads/${item.productImage}`
}
  alt={item.productTitle}
/>

                  <div className="flex-1">

                    <h4 className="text-sm font-semibold text-on-surface mb-1">{item.productTitle}</h4>

                    <p className="text-xs text-on-surface-variant mb-1">
                      Rs. {item.productPrice}
                    </p>

                    <div className="flex items-center gap-2 mt-1">

                      <button
                        className="w-7 h-7 rounded border border-outline-variant bg-white cursor-pointer text-sm hover:bg-surface-container"
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.productId)
                        }
                      >
                        -
                      </button>

                      <span className="text-sm font-semibold min-w-[24px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        className="w-7 h-7 rounded border border-outline-variant bg-white cursor-pointer text-sm hover:bg-surface-container"
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.productId)
                        }
                      >
                        +
                      </button>

                    </div>

                    <strong className="text-sm text-primary">

                      Rs.{" "}

                      {(
                        Number(item.productPrice) *
                        item.quantity
                      ).toLocaleString()}

                    </strong>

                  </div>

                  <button
                    className="text-error-light bg-transparent border-none cursor-pointer p-1 hover:text-error-hover"
                    type="button"
                    onClick={() =>
                      removeFromCart(item.productId)
                    }
                  >

                    <FiTrash2 />

                  </button>

                </div>

              ))}

              <div className="flex justify-between items-center pt-4 mt-2">

                <span className="font-semibold text-on-surface">Total</span>

                <strong className="text-xl font-bold text-primary">
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
      <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-[3000] p-4">
        <div className="bg-white rounded-2xl p-8 max-w-[440px] w-full text-center shadow-modal">
          <div className="text-success-green text-5xl mb-4">
            <FiCheckCircle />
          </div>
          <h2 className="font-display text-2xl font-bold text-on-surface mb-2">Order Placed Successfully!</h2>
          <p className="text-on-surface-variant text-sm mb-6">Thank you, {orderSuccess.name}. Your order has been confirmed.</p>

          <div className="bg-surface-container-low rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-on-surface-variant">Order ID</span>
              <div className="flex items-center gap-2">
                <strong className="text-sm text-on-surface">{orderSuccess.orderId}</strong>
                <button
                  className="flex items-center gap-1 text-xs bg-transparent border border-outline-variant rounded px-2 py-1 cursor-pointer hover:bg-surface-container"
                  onClick={() => handleCopyOrderId(orderSuccess.orderId)}
                  title="Copy Order ID"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-on-surface-variant">Items</span>
              <strong className="text-sm text-on-surface">{orderSuccess.items}</strong>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-on-surface-variant">Total</span>
              <strong className="text-sm text-on-surface">Rs. {orderSuccess.total.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-on-surface-variant">Payment</span>
              <strong className="text-sm text-on-surface">Cash On Delivery</strong>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant mb-4">Please save your Order ID to track your order.</p>

          <button className="w-full bg-primary text-white border-none py-3 rounded-lg font-semibold cursor-pointer hover:bg-primary-dark" onClick={handleOrderContinue}>
            Track My Order
          </button>
        </div>
      </div>
    )}
    </>
  );
}

export default Checkout;
