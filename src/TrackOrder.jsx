import { useState } from "react";
import "./trackOrder.css";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim()) {
      alert("Please enter your Order ID");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/api/orders/track/${orderId}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setOrder(null);
        return;
      }

      setOrder(data);
    } catch (err) {
      console.log(err);
      alert("Unable to track order.");
    } finally {
      setLoading(false);
    }
  };

  const totalItems = order
    ? order.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const isReceived = !!order;
  const isProcessing =
    order &&
    ["Processing", "Shipped", "Delivered"].includes(order.status);

  const isShipped =
    order &&
    ["Shipped", "Delivered"].includes(order.status);

  const isDelivered =
    order &&
    order.status === "Delivered";

  return (
    <>
      <Navbar />

      <div className="track-page">
        <div className="track-container">

          <div className="track-header">
            <h1>Track Your Order</h1>

            <p>
              Enter your Order ID to check your order status.
            </p>
          </div>

          <div className="track-box">

            <div className="track-input">

              <input
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) =>
                  setOrderId(e.target.value.toUpperCase())
                }
              />

              <button
                onClick={handleTrack}
                disabled={loading}
              >
                {loading ? "Searching..." : "Track Order"}
              </button>

            </div>

            {order && (

              <div className="order-result">

                <div className="order-top">

                  <div>
                    <span>Order ID</span>

                    <h3>{order.orderId}</h3>
                  </div>

                  <div className="status">
                    {order.status}
                  </div>

                </div>

                <div className="order-details">

                  <div>
                    <span>Customer</span>

                    <h4>
                      {order.firstName} {order.lastName}
                    </h4>
                  </div>

                  <div>
                    <span>Order Date</span>

                    <h4>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </h4>
                  </div>

                  <div>
                    <span>Total Items</span>

                    <h4>{totalItems}</h4>
                  </div>

                  <div>
                    <span>Total Amount</span>

                    <h4>
                      Rs.{" "}
                      {Number(
                        order.totalPrice
                      ).toLocaleString()}
                    </h4>
                  </div>

                </div>

                <div className="progress">

                  <div
                    className={`step ${
                      isReceived ? "active" : ""
                    }`}
                  >
                    <div>
                      {isReceived ? "✓" : "1"}
                    </div>

                    <p>Received</p>
                  </div>

                  <div
                    className={`line ${
                      isProcessing
                        ? "active-line"
                        : ""
                    }`}
                  ></div>

                  <div
                    className={`step ${
                      isProcessing
                        ? "active"
                        : ""
                    }`}
                  >
                    <div>
                      {isProcessing ? "✓" : "2"}
                    </div>

                    <p>Processing</p>
                  </div>

                  <div
                    className={`line ${
                      isShipped
                        ? "active-line"
                        : ""
                    }`}
                  ></div>

                  <div
                    className={`step ${
                      isShipped
                        ? "active"
                        : ""
                    }`}
                  >
                    <div>
                      {isShipped ? "✓" : "3"}
                    </div>

                    <p>Shipped</p>
                  </div>

                  <div
                    className={`line ${
                      isDelivered
                        ? "active-line"
                        : ""
                    }`}
                  ></div>

                  <div
                    className={`step ${
                      isDelivered
                        ? "active"
                        : ""
                    }`}
                  >
                    <div>
                      {isDelivered ? "✓" : "4"}
                    </div>

                    <p>Delivered</p>
                  </div>

                </div>

                <div
                  style={{
                    marginTop: "35px",
                  }}
                >

                  <h3>Ordered Products</h3>

                  <table
                    className="order-products-table"
                    style={{
                      width: "100%",
                      marginTop: "15px",
                    }}
                  >

                    <thead>

                      <tr>

                        <th>Product</th>

                        <th>Qty</th>

                        <th>Price</th>

                        <th>Subtotal</th>

                      </tr>

                    </thead>

                    <tbody>

                      {order.items.map((item) => (

                        <tr key={item.productId}>

                          <td>
                            {item.productTitle}
                          </td>

                          <td>
                            {item.quantity}
                          </td>

                          <td>
                            Rs. {item.price}
                          </td>

                          <td>
                            Rs.{" "}
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString()}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </div>

        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default TrackOrder;