import { useState } from "react";
import "./trackOrder.css";
import Navbar from "./navbar.jsx"
import Footer from "./footer.jsx"

function TrackOrder() {

  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = () => {

    if(!orderId){
      alert("Please enter your order ID");
      return;
    }

    // Temporary data
    // Later connect with backend API
    setOrder({
      id: orderId,
      status: "Processing",
      date: "14 July 2026",
      items: 3,
      amount: "Rs. 2500"
    });

  };


  return (
    <>
    <Navbar/>
    <div className="track-page">

      <div className="track-container">


        <div className="track-header">

          <h1>
            Track Your Order
          </h1>

          <p>
            Enter your order ID and check your delivery status
          </p>

        </div>



        <div className="track-box">


          <div className="track-input">

            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e)=>setOrderId(e.target.value)}
            />

            <button onClick={handleTrack}>
              Track Order
            </button>

          </div>



          {order && (

            <div className="order-result">


              <div className="order-top">

                <div>
                  <span>Order ID</span>
                  <h3>
                    #{order.id}
                  </h3>
                </div>


                <div className="status">
                  {order.status}
                </div>

              </div>



              <div className="order-details">


                <div>
                  <span>Order Date</span>
                  <h4>{order.date}</h4>
                </div>


                <div>
                  <span>Total Items</span>
                  <h4>{order.items}</h4>
                </div>


                <div>
                  <span>Total Amount</span>
                  <h4>{order.amount}</h4>
                </div>


              </div>




              <div className="progress">


                <div className="step active">
                  <div>
                    ✓
                  </div>
                  <p>
                    Received
                  </p>
                </div>


                <div className="line active-line"></div>


                <div className="step active">
                  <div>
                    ✓
                  </div>
                  <p>
                    Processing
                  </p>
                </div>


                <div className="line"></div>


                <div className="step">
                  <div>
                    3
                  </div>
                  <p>
                    Delivery
                  </p>
                </div>


                <div className="line"></div>


                <div className="step">
                  <div>
                    4
                  </div>
                  <p>
                    Delivered
                  </p>
                </div>



              </div>



            </div>

          )}



        </div>


      </div>

    </div>
    <Footer/>
    </>
  );
}


export default TrackOrder;