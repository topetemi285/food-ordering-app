/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../AppContxt";
import toast from "react-hot-toast";
import MenuItemTiles from "../menu/MenuItemTiles";
import Image from "next/image";

function MenuItem(menItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrice } =
    menItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtra, setSelectedExtra] = useState([]);

  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleExrtaThingChecked(ev, extraThings) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedExtra((prev) => [...prev, extraThings]);
    } else {
      setSelectedSize((prev) => {
        return prev.filter((e) => e.name !== extraThings.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtra?.length > 0) {
    for (const extra of selectedExtra) {
      selectedPrice += extra.price;
    }
  }

  async function handleAddToCartButton() {
    const hasOptions = sizes.length > 0 || extraIngredientPrice.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }

    addToCart(menItem, selectedExtra, selectedPrice);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopUp(false);
  }
  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-lg"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh-100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={20}
                height={20}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-gray-500 text-sm mb-2">{description}</p>
              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your Size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-2 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        name="size"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {/* <div>this is the length{extraIngredientPrice?.length}</div> */}

              {extraIngredientPrice?.length > 0 && (
                <div className="py-2">
                  <h3>Any extras?</h3>
                  {extraIngredientPrice.map((extraThings) => (
                    <label
                      key={extraThings._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) =>
                          handleExrtaThingChecked(ev, extraThings)
                        }
                        name={extraThings.name}
                        checked={selectedExtra
                          .map((e) => e._id)
                          .includes(extraThings._id)}
                      />
                      {extraThings.name} + ${extraThings.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButton}
                className="bg-blue-950 text-white sticky bottom-2"
                type="button"
              >
                Add to cart ${selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTiles addCart={handleAddToCartButton} {...menItem} />
    </>
  );
}

export default MenuItem;
