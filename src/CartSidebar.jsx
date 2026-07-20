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
        className={`fixed inset-0 bg-black/40 z-[1500] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
        onClick={onClose}
      />


      <div className={`fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white z-[2000] shadow-dropdown ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 flex flex-col`}>

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-cart-border">

          <h2 className="font-display text-xl font-bold text-on-surface">
            Shopping Cart
          </h2>


          <button
            className="w-9 h-9 flex items-center justify-center bg-surface-container rounded-full border-none cursor-pointer text-on-surface-variant hover:bg-outline-variant"
            onClick={onClose}
          >
            <FiX />
          </button>

        </div>



        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">


          {cartItems.length === 0 ? (

            <div className="text-center py-16">

              <h3 className="text-on-surface mb-2">
                Your cart is empty
              </h3>

              <p className="text-on-surface-variant text-sm">
                Add products to start shopping.
              </p>

            </div>


          ) : (


            cartItems.map((item) => (

              <div 
                className="flex gap-3 py-4 border-b border-cart-border last:border-b-0" 
                key={item.productId}
              >


                <img
                  className="w-[80px] h-[80px] object-cover rounded-lg flex-shrink-0"
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



                <div className="flex-1 min-w-0">


                  <h4 className="text-sm font-semibold text-on-surface mb-1 truncate">
                    {item.productTitle}
                  </h4>



                  <p className="text-primary text-sm font-bold mb-1">
                    Rs. {item.productPrice}
                  </p>



                  <div className="flex items-center gap-2 mt-1">


                    <button
                      className="w-7 h-7 rounded border border-outline-variant bg-white cursor-pointer text-sm font-bold hover:bg-surface-container"
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
                      className="w-7 h-7 rounded border border-outline-variant bg-white cursor-pointer text-sm font-bold hover:bg-surface-container"
                      onClick={() =>
                        increaseQuantity(item.productId)
                      }
                    >
                      +
                    </button>


                  </div>




                  <p className="text-xs text-on-surface-variant mt-1">

                    Subtotal: Rs.{" "}

                    {
                      Number(item.productPrice) *
                      item.quantity
                    }

                  </p>



                </div>




                <button

                  className="text-error-light bg-transparent border-none cursor-pointer p-1 self-start hover:text-error-hover"

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

          <div className="border-t border-cart-border p-5">


            <div className="flex justify-between items-center mb-4">


              <span className="font-semibold text-on-surface">
                Total
              </span>


              <strong className="text-xl font-bold text-primary">
                Rs. {total.toLocaleString()}
              </strong>


            </div>




            <Link to="/Checkout">

              <button className="w-full bg-primary text-white border-none py-3 rounded-lg font-semibold text-base cursor-pointer hover:bg-primary-dark">

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
