import { useEffect, useState } from "react";
import "./orders.css";
import { FiEye, FiTrash2 } from "react-icons/fi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/orders"
      );

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
      await fetch(
        `http://localhost:3001/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:3001/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
     <div className="orders-page">

    <div className="orders-header">

      <h2>Orders</h2>

    </div>

    <table className="orders-table">

  <thead>

    <tr>

      <th>Customer</th>

       <th>Order ID</th>

      <th>Phone</th>

      <th>Total</th>

      <th>Payment</th>

      <th>Status</th>

      <th>Date</th>

      <th>Actions</th>

    </tr>

  </thead>

  <tbody>

    {orders.length === 0 ? (

      <tr>

        <td colSpan="7" className="no-orders">
          No Orders Found
        </td>

      </tr>

    ) : (

      orders.map((order) => (

       <tr key={order._id}>

  

  <td>
    {order.firstName} {order.lastName}
  </td>
  <td className="order-id-cell">
    {order.orderId}
  </td>

          <td>

            {order.phone}

          </td>

          <td>

            Rs. {Number(order.totalPrice).toLocaleString()}

          </td>

          <td>

            {order.paymentMethod}

          </td>

          <td>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(
                  order._id,
                  e.target.value
                )
              }
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </td>

          <td>

            {new Date(order.createdAt).toLocaleDateString()}

          </td>

          <td>

            <div className="actions-cell">

              <button
                className="view-order-btn"
                onClick={() => viewOrder(order)}
              >

                <FiEye />

              </button>

              <button
                className="delete-order-btn"
                onClick={() =>
                  deleteOrder(order._id)
                }
              >

                <FiTrash2 />

              </button>

            </div>

          </td>

        </tr>

      ))

    )}

  </tbody>

</table>
{/* </tbody> */}

{/* </table> */}

{showModal && selectedOrder && (

  <div className="order-modal-overlay">

    <div className="order-modal">

      <div className="order-modal-header">

        <h2>Order Details</h2>

       

      </div>

      <div className="order-customer">

        <h3>Customer Information</h3>

        <p>
          <strong>Name:</strong>{" "}
          {selectedOrder.firstName}{" "}
          {selectedOrder.lastName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {selectedOrder.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {selectedOrder.phone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {selectedOrder.address}
        </p>

        <p>
          <strong>Postal Code:</strong>{" "}
          {selectedOrder.postalCode}
        </p>

      </div>

      <div className="order-products">

  <h3>Ordered Products</h3>

  {selectedOrder.items?.length > 0 ? (

    <table className="order-products-table">

      <thead>

        <tr>

          <th>Image</th>

          <th>Product</th>

          <th>Price</th>

          <th>Quantity</th>

          <th>Subtotal</th>

        </tr>

      </thead>

      <tbody>

        {selectedOrder.items.map((item, index) => (

          <tr key={index}>

            <td>

              <img
  src={
    item.imageType === "deal"
      ? `http://localhost:3001/dealuploads/${item.productImage}`
      : `http://localhost:3001/productuploads/${item.productImage}`
  }
  alt={item.productTitle}
/>

            </td>

            <td>{item.productTitle}</td>

            <td>Rs. {item.price}</td>

            <td>{item.quantity}</td>

            <td>

              Rs. {item.price * item.quantity}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  ) : (

    <p>No Products Found.</p>

  )}

</div>

      <div className="order-summary">

  <h3>Order Summary</h3>

  <p>
    <strong>Payment :</strong>{" "}
    {selectedOrder.paymentMethod}
  </p>

  <p>
    <strong>Status :</strong>{" "}
    {selectedOrder.status}
  </p>

  <p>
    <strong>Order ID :</strong>{" "}
    <span className="order-id-text">
      {selectedOrder.orderId}
    </span>
  </p>

  <p>
    <strong>Estimated Delivery :</strong>{" "}
    {selectedOrder.estimatedDelivery
      ? new Date(
          selectedOrder.estimatedDelivery
        ).toLocaleDateString()
      : "N/A"}
  </p>

  <p>
    <strong>Total :</strong>{" "}
    Rs. {Number(selectedOrder.totalPrice).toLocaleString()}
  </p>

</div>

    <div className="order-modal-footer">
      

  <button
    className="print-modal-btn"
    onClick={() => window.print()}
  >
    Print Bill
  </button>

  <button
    className="close-modal-btn"
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