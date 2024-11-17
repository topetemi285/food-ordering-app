"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeader from "../../components/layout/SectionHeader";
import { CartContext, cartProductPrice } from "../../components/AppContxt";
import Image from "next/image";
import AddressForm from "../../components/layout/AddressForm";
import UserProfile from "../../hooks/UserProfile";

function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = UserProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((previousAddress) => ({
      ...previousAddress,
      [propName]: value,
    }));
  }

  return (
    <section className="mt-8">
      <div className="">
        <SectionHeader title="Cart" />
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-10 mb-4 border-b py-4 "
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3>{product.name}</h3>

                  {product.sizes?.length > 0 && (
                    <div className="text-sm">
                      Size:{" "}
                      <span>
                        {product.sizes.map((size) => size.name).join(", ")}
                      </span>
                    </div>
                  )}

                  {product.extraIngredientPrice?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extraIngredientPrice.map((extra) => (
                        <div key={extra.name}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <p className="text-gray-500">Subtotal:</p>{" "}
            <span className="font-semibold">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <label>Adress</label>
            <AddressForm
              addressProps={{ address }}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
