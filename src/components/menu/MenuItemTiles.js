import React from "react";
import Image from "next/image";

function MenuItemTiles({ addCart, ...item }) {
  const { image, name, description, price, sizes, extraIngredientPrices } =
    item;
  return (
    <div className="hover:bg-gray-200 hover:shadow-md hover:shadow-black/25 transition-all border-1 border p-4 rounded-lg text-center items-center">
      <Image
        src={image}
        alt={name}
        height={190}
        width={190}
        className="object-contain"
      />
      <h1 className="font-bold text-lg my-3">{name}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
      <button
        onClick={() => {
          addCart();
        }}
        className="bg-blue-950 rounded-full px-6 py-2 text-white mt-3"
      >
        {sizes?.length > 0 || extraIngredientPrices > 0 ? (
          <span>Add to Cart(From ${price})</span>
        ) : (
          <span> Add to Cart ${price}</span>
        )}
      </button>
    </div>
  );
}

export default MenuItemTiles;
