"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  // Ensure basePrice is a valid number, defaulting to 0 if not
  let price = Number(cartProduct.basePrice) || 0;

  // Check if sizes array exists and has valid prices
  if (cartProduct.sizes?.length > 0) {
    // Sum the prices of all sizes in the array, default to 0 if price is invalid
    price += cartProduct.sizes.reduce((acc, size) => acc + (Number(size.price) || 0), 0);
  }

  // Check if extra ingredients exist and have valid prices
  if (cartProduct.extraIngredientPrice?.length > 0) {
    for (const extra of cartProduct.extraIngredientPrice) {
      price += Number(extra.price) || 0;  // Ensure price is a number
    }
  }

  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((preCartProduct) => {
      const newCartProducts = preCartProduct.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);

      return newCartProducts;
    });
    toast.success("product removed!");
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((preProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...preProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeCartProduct,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
