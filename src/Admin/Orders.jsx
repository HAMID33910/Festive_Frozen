import { useEffect, useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../config";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await fetch(`${API_URL}/api/orders/${id}`, { method: "DELETE" });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Processing": return "bg-blue-100 text-blue-700";
      case "Shipped": return "bg-purple-100 text-purple-700";
      case "Delivered": return "bg-green-100 text-green-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-admin-text">Orders</h2>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#8f3f16] text-white">
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Customer</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Order ID</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Phone</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Total</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Payment</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Status</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Date</th>
                <th className="py-3.5 px-5 text-center text-[13px] font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#999] text-sm">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 px-5 text-sm text-[#333]">{order.firstName} {order.lastName}</td>
                    <td className="py-3 px-5 text-sm text-[#333] font-mono">{order.orderId}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{order.phone}</td>
                    <td className="py-3 px-5 text-sm text-[#333] font-medium">Rs. {Number(order.totalPrice).toLocaleString()}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{order.paymentMethod}</td>
                    <td className="py-3 px-5">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`py-1.5 px-3 border-none rounded-full text-xs font-semibold cursor-pointer outline-none ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-5 text-sm text-[#555]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="w-9 h-9 border-none rounded-lg flex justify-center items-center text-white cursor-pointer transition-all duration-200 bg-[#3b82f6] hover:bg-[#2563eb] hover:-translate-y-0.5"
                          onClick={() => viewOrder(order)}
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          className="w-9 h-9 border-none rounded-lg flex justify-center items-center text-white cursor-pointer transition-all duration-200 bg-[#dc2626] hover:bg-[#b91c1c] hover:-translate-y-0.5"
                          onClick={() => deleteOrder(order._id)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/45 flex justify-center items-center z-[9999] p-4">
          <div className="w-[900px] max-w-[95%] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-[30px] shadow-2xl max-md:p-5">
            <div className="flex justify-between items-center border-b border-[#eee] pb-4 mb-6">
              <h2 className="m-0 text-[#8f3f16] text-[28px] font-bold">Order Details</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
              <h3 className="col-span-full m-0 text-[#8f3f16] text-lg font-semibold">Customer Information</h3>
              <p className="m-0 text-[#555] text-[15px]">
                <strong className="text-[#222]">Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}
              </p>
              <p className="m-0 text-[#555] text-[15px]">
                <strong className="text-[#222]">Email:</strong> {selectedOrder.email}
              </p>
              <p className="m-0 text-[#555] text-[15px]">
                <strong className="text-[#222]">Phone:</strong> {selectedOrder.phone}
              </p>
              <p className="m-0 text-[#555] text-[15px]">
                <strong className="text-[#222]">Address:</strong> {selectedOrder.address}
              </p>
              <p className="m-0 text-[#555] text-[15px]">
                <strong className="text-[#222]">Postal Code:</strong> {selectedOrder.postalCode}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-[#8f3f16] text-lg font-semibold mb-4">Ordered Products</h3>
              {selectedOrder.items?.length > 0 ? (
                <div className="bg-white rounded-xl overflow-hidden border border-[#eee]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#8f3f16]">
                        <th className="text-white py-3 px-4 text-left text-[13px] font-semibold uppercase tracking-wider">Image</th>
                        <th className="text-white py-3 px-4 text-left text-[13px] font-semibold uppercase tracking-wider">Product</th>
                        <th className="text-white py-3 px-4 text-left text-[13px] font-semibold uppercase tracking-wider">Price</th>
                        <th className="text-white py-3 px-4 text-left text-[13px] font-semibold uppercase tracking-wider">Qty</th>
                        <th className="text-white py-3 px-4 text-left text-[13px] font-semibold uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-b border-[#eee] last:border-b-0 hover:bg-[#fafaf9]">
                          <td className="py-3 px-4">
                            <img
                              src={
                                item.imageType === "deal"
                                  ? `${API_URL}/dealuploads/${item.productImage}`
                                  : `${API_URL}/productuploads/${item.productImage}`
                              }
                              alt={item.productTitle}
                              className="w-14 h-14 object-cover rounded-lg max-md:w-12 max-md:h-12"
                            />
                          </td>
                          <td className="py-3 px-4 text-sm text-[#333]">{item.productTitle}</td>
                          <td className="py-3 px-4 text-sm text-[#555]">Rs. {item.price}</td>
                          <td className="py-3 px-4 text-sm text-[#555]">{item.quantity}</td>
                          <td className="py-3 px-4 text-sm text-[#333] font-medium">Rs. {item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[#999] text-sm">No Products Found.</p>
              )}
            </div>

            <div className="mt-6 bg-[#fafafa] border border-[#eee] rounded-xl p-5">
              <h3 className="m-0 mb-4 text-[#8f3f16] text-lg font-semibold">Order Summary</h3>
              <div className="flex flex-col gap-3">
                <p className="flex justify-between items-center text-[#555] text-[15px] max-md:flex-col max-md:items-start max-md:gap-1">
                  <strong className="text-[#222]">Payment:</strong>
                  <span>{selectedOrder.paymentMethod}</span>
                </p>
                <p className="flex justify-between items-center text-[#555] text-[15px] max-md:flex-col max-md:items-start max-md:gap-1">
                  <strong className="text-[#222]">Status:</strong>
                  <span>{selectedOrder.status}</span>
                </p>
                <p className="flex justify-between items-center text-[#555] text-[15px] max-md:flex-col max-md:items-start max-md:gap-1">
                  <strong className="text-[#222]">Order ID:</strong>
                  <span className="text-[#8f3f16] font-bold">{selectedOrder.orderId}</span>
                </p>
                <p className="flex justify-between items-center text-[#555] text-[15px] max-md:flex-col max-md:items-start max-md:gap-1">
                  <strong className="text-[#222]">Estimated Delivery:</strong>
                  <span>
                    {selectedOrder.estimatedDelivery
                      ? new Date(selectedOrder.estimatedDelivery).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
                <p className="flex justify-between items-center text-[#555] text-[15px] font-semibold max-md:flex-col max-md:items-start max-md:gap-1">
                  <strong className="text-[#222]">Total:</strong>
                  <span>Rs. {Number(selectedOrder.totalPrice).toLocaleString()}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#eee] max-md:flex-col">
              <button
                className="border-none bg-[#2e7d32] text-white py-3 px-7 rounded-lg cursor-pointer text-[15px] font-semibold transition-all duration-300 hover:bg-[#1b5e20] max-md:w-full"
                onClick={() => window.print()}
              >
                Print Bill
              </button>
              <button
                className="border-none bg-[#8f3f16] text-white py-3 px-7 rounded-lg cursor-pointer text-[15px] font-semibold transition-all duration-300 hover:bg-[#74310f] max-md:w-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
