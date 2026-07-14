

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

if (!user || !user.id) {
  alert("Please login first");
  return;
}

const userId = user.id;

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
      alert("Please login first.");
      return;
    }

    try {
      await fetch(
        "http://localhost:3001/api/cart/add",
        {
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
        }
      );

      await loadCart();

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}