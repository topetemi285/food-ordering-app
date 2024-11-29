import React from "react";
import Image from "next/image";

function MenuItemTiles({ addCart, ...item }) {
  const { image, name, description, price, sizes, extraIngredientPrices } =
    item;
  return (
    // <div
    // className="hover:bg-gray-200 hover:shadow-md
    // hover:shadow-black/25 transition-all
    // border-1 border p-4 rounded-lg text-center items-center">
    <div
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 
    bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full">
        <div className="w-full aspect-square overflow-hidden relative">
          <Image src={image} alt={name} fill className="object-contain" />
        </div>

        <h1 className="font-bold text-lg my-1">{name}</h1>

        <p className="text-gray-500 text-sm">{description}</p>
        <button
          onClick={() => {
            addCart();
          }}
          className="bg-blue-700 rounded-full px-6 py-1 text-white mt-1 sm:text-sm"
        >
          {sizes?.length > 0 || extraIngredientPrices > 0 ? (
            <span>Add to Cart(From ${price})</span>
          ) : (
            <span> Add to Cart ${price}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default MenuItemTiles;
