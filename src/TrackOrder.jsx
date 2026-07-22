import { useState } from "react";
import { API_URL } from "./config";
import Navbar from "./Navbar.jsx";
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
        `${API_URL}/api/orders/track/${orderId}`
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

      <div className="py-16 px-6 max-w-[900px] mx-auto">

          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-primary mb-2">Track Your Order</h1>

            <p className="text-on-surface-variant">
              Enter your Order ID to check your order status.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">

            <div className="flex gap-3 mb-8 max-[600px]:flex-col">

              <input
                className="flex-1 py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) =>
                  setOrderId(e.target.value.toUpperCase())
                }
              />

              <button
                className="bg-primary text-white border-none py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-primary-dark disabled:opacity-50"
                onClick={handleTrack}
                disabled={loading}
              >
                {loading ? "Searching..." : "Track Order"}
              </button>

            </div>

            {order && (

              <div>

                <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant">

                  <div>
                    <span className="text-sm text-on-surface-variant">Order ID</span>

                    <h3 className="text-lg font-bold text-on-surface">{order.orderId}</h3>
                  </div>

                  <div className="bg-primary text-white py-1 px-4 rounded-full text-sm font-bold">
                    {order.status}
                  </div>

                </div>

                <div className="grid grid-cols-4 gap-4 mb-8 max-[600px]:grid-cols-2">

                  <div>
                    <span className="text-xs text-on-surface-variant">Customer</span>

                    <h4 className="text-sm font-semibold text-on-surface">
                      {order.firstName} {order.lastName}
                    </h4>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant">Order Date</span>

                    <h4 className="text-sm font-semibold text-on-surface">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </h4>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant">Total Items</span>

                    <h4 className="text-sm font-semibold text-on-surface">{totalItems}</h4>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant">Total Amount</span>

                    <h4 className="text-sm font-semibold text-on-surface">
                      Rs.{" "}
                      {Number(
                        order.totalPrice
                      ).toLocaleString()}
                    </h4>
                  </div>

                </div>

                <div className="flex items-center justify-center gap-2 my-8 max-[600px]:gap-1">

                  <div
                    className={`flex flex-col items-center gap-2 ${
                      isReceived ? "active" : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full border-2 ${isReceived ? "border-primary bg-primary text-white" : "border-outline-variant text-on-surface-variant"} flex items-center justify-center text-sm font-bold`}>
                      {isReceived ? "✓" : "1"}
                    </div>

                    <p className="text-xs text-on-surface-variant m-0">Received</p>
                  </div>

                  <div
                    className={`w-[60px] h-[2px] ${
                      isProcessing
                        ? "bg-primary"
                        : "bg-outline-variant"
                    }`}
                  ></div>

                  <div
                    className={`flex flex-col items-center gap-2 ${
                      isProcessing
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full border-2 ${isProcessing ? "border-primary bg-primary text-white" : "border-outline-variant text-on-surface-variant"} flex items-center justify-center text-sm font-bold`}>
                      {isProcessing ? "✓" : "2"}
                    </div>

                    <p className="text-xs text-on-surface-variant m-0">Processing</p>
                  </div>

                  <div
                    className={`w-[60px] h-[2px] ${
                      isShipped
                        ? "bg-primary"
                        : "bg-outline-variant"
                    }`}
                  ></div>

                  <div
                    className={`flex flex-col items-center gap-2 ${
                      isShipped
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full border-2 ${isShipped ? "border-primary bg-primary text-white" : "border-outline-variant text-on-surface-variant"} flex items-center justify-center text-sm font-bold`}>
                      {isShipped ? "✓" : "3"}
                    </div>

                    <p className="text-xs text-on-surface-variant m-0">Shipped</p>
                  </div>

                  <div
                    className={`w-[60px] h-[2px] ${
                      isDelivered
                        ? "bg-primary"
                        : "bg-outline-variant"
                    }`}
                  ></div>

                  <div
                    className={`flex flex-col items-center gap-2 ${
                      isDelivered
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full border-2 ${isDelivered ? "border-primary bg-primary text-white" : "border-outline-variant text-on-surface-variant"} flex items-center justify-center text-sm font-bold`}>
                      {isDelivered ? "✓" : "4"}
                    </div>

                    <p className="text-xs text-on-surface-variant m-0">Delivered</p>
                  </div>

                </div>

                <div
                  className="mt-[35px]"
                >

                  <h3 className="text-lg font-bold text-on-surface">Ordered Products</h3>

                  <table
                    className="w-full mt-4"
                  >

                    <thead>

                      <tr>

                        <th className="text-left py-2 px-3 border-b border-outline-variant text-sm font-semibold text-on-surface-variant">Product</th>

                        <th className="text-left py-2 px-3 border-b border-outline-variant text-sm font-semibold text-on-surface-variant">Qty</th>

                        <th className="text-left py-2 px-3 border-b border-outline-variant text-sm font-semibold text-on-surface-variant">Price</th>

                        <th className="text-left py-2 px-3 border-b border-outline-variant text-sm font-semibold text-on-surface-variant">Subtotal</th>

                      </tr>

                    </thead>

                    <tbody>

                      {order.items.map((item) => (

                        <tr key={item.productId}>

                          <td className="py-2 px-3 border-b border-outline-variant text-sm text-on-surface">
                            {item.productTitle}
                          </td>

                          <td className="py-2 px-3 border-b border-outline-variant text-sm text-on-surface">
                            {item.quantity}
                          </td>

                          <td className="py-2 px-3 border-b border-outline-variant text-sm text-on-surface">
                            Rs. {item.price}
                          </td>

                          <td className="py-2 px-3 border-b border-outline-variant text-sm text-on-surface">
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

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default TrackOrder;
