

import { createContext, useState, useEffect } from "react";
import LoginRequiredModal from "./LoginRequiredModal";
import SuccessToast from "./SuccessToast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const userId = user?.id;

  /* ==========================
     LOAD CART FROM DATABASE
  ========================== */

  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [userId]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlistItems");
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const loadCart = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/cart/${userId}`
      );

      const data = await res.json();

      if (res.ok) {
        setCartItems(data.items || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ==========================
     ADD PRODUCT
  ========================== */

  const addToCart = async (product) => {
  if (!userId) {
    setShowLoginModal(true);
    return; // Stop here if user is not logged in
  }

  try {
    await fetch("http://localhost:3001/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId: product._id,
        productTitle: product.productTitle,
        productImage: product.productImage,
        productPrice: product.productPrice,
        quantity: product.quantity || 1,
        imageType: product.imageType || "product",
      }),
    });

    await loadCart();

    setToastMessage("Product added to cart successfully.");
    setShowSuccessToast(true);
    setIsCartOpen(true);

  } catch (err) {
    console.log(err);
  }
};

  /* ==========================
     REMOVE PRODUCT
  ========================== */

  const removeFromCart = async (productId) => {
    try {
      await fetch(
        "http://localhost:3001/api/cart/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
          }),
        }
      );

      await loadCart();

    } catch (err) {
      console.log(err);
    }
  };

  /* ==========================
     INCREASE QUANTITY
  ========================== */

  const increaseQuantity = async (productId) => {
    try {
      await fetch(
        "http://localhost:3001/api/cart/increase",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
          }),
        }
      );

      await loadCart();

    } catch (err) {
      console.log(err);
    }
  };

  /* ==========================
     DECREASE QUANTITY
  ========================== */

  const decreaseQuantity = async (productId) => {
    try {
      await fetch(
        "http://localhost:3001/api/cart/decrease",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
          }),
        }
      );

      await loadCart();

    } catch (err) {
      console.log(err);
    }
  };

  /* ==========================
     CLEAR CART
  ========================== */

  const clearCart = async () => {
    try {
      await fetch(
        `http://localhost:3001/api/cart/${userId}`,
        {
          method: "DELETE",
        }
      );

      setCartItems([]);

    } catch (err) {
      console.log(err);
    }
  };

  const addToWishlist = (item) => {
    setWishlistItems((prev) => {
      const exists = prev.some((wishlistItem) => wishlistItem._id === item._id);
      if (exists) {
        return prev;
      }

      const next = [...prev, item];
      localStorage.setItem("wishlistItems", JSON.stringify(next));
      return next;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => {
      const next = prev.filter((wishlistItem) => wishlistItem._id !== itemId);
      localStorage.setItem("wishlistItems", JSON.stringify(next));
      return next;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        loadCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        setShowLoginModal,
      }}
    >
      {children}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      {/* <SuccessToast
  isOpen={showSuccessToast}
  message={toastMessage}
  onClose={() => setShowSuccessToast(false)}
/> */}
    </CartContext.Provider>
  );
}