import "./cartSidebar.css";
import { FiX, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.productPrice) * item.quantity,
    0
  );


  return (
    <>

      <div
        className={`cart-overlay ${isOpen ? "show-overlay" : ""}`}
        onClick={onClose}
      />


      <div className={`cart-sidebar ${isOpen ? "show-cart" : ""}`}>

        {/* Header */}
        <div className="cart-header">

          <h2>
            Shopping Cart
          </h2>


          <button
            className="cart-close-btn"
            onClick={onClose}
          >
            <FiX />
          </button>

        </div>



        {/* Body */}
        <div className="cart-body">


          {cartItems.length === 0 ? (

            <div className="cart-empty">

              <h3>
                Your cart is empty
              </h3>

              <p>
                Add products to start shopping.
              </p>

            </div>


          ) : (


            cartItems.map((item) => (

              <div 
                className="cart-item" 
                key={item.productId}
              >


                <img
                  src={
                    item.imageType === "deal"
                      ? `http://localhost:3001/dealuploads/${item.productImage}`
                      : `http://localhost:3001/productuploads/${item.productImage}`
                  }
                  alt={item.productTitle}

                  onError={(e)=>{
                    e.target.src =
                    "https://placehold.co/100x100?text=No+Image";
                  }}
                />



                <div className="cart-item-details">


                  <h4>
                    {item.productTitle}
                  </h4>



                  <p className="item-price">
                    Rs. {item.productPrice}
                  </p>



                  <div className="cart-quantity">


                    <button
                      className="qty-btn"
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
                      className="qty-btn"
                      onClick={() =>
                        increaseQuantity(item.productId)
                      }
                    >
                      +
                    </button>


                  </div>




                  <p className="item-subtotal">

                    Subtotal: Rs.{" "}

                    {
                      Number(item.productPrice) *
                      item.quantity
                    }

                  </p>



                </div>




                <button

                  className="delete-btn"

                  onClick={() =>
                    removeFromCart(item.productId)
                  }

                  title="Remove Item"

                >

                  <FiTrash2 />

                </button>



              </div>

            ))

          )}


        </div>





        {/* Footer */}

        {cartItems.length > 0 && (

          <div className="cart-footer">


            <div className="cart-total">


              <span>
                Total
              </span>


              <strong>
                Rs. {total.toLocaleString()}
              </strong>


            </div>




            <Link to="/Checkout">

              <button className="checkout-btn">

                Proceed to Checkout

              </button>

            </Link>



          </div>

        )}



      </div>


    </>
  );
}


export default CartSidebar;