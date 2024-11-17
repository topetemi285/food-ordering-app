"use client";
import React from "react";
import { useState } from "react";

function MenuItemPriceProps({ addItemSize, name, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function addSize() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editSize(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeSIzes(indexToRemove) {
    setProps((prev) => prev.filter((value, index) => index !== indexToRemove));
  }

  return (
    //I can use this logic for my menu
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex p-1 border-0 justify-start"
        type="button"
      >
        {isOpen && <div>{"<"}</div>}
        {!isOpen && <div>{">"}</div>}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>

      {/* <label>{name}</label> */}

      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div
              key={index}
              className="flex items-end gap-2"
            >
              <div>
                <label>Size name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editSize(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  onChange={(ev) => editSize(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeSIzes(index)}
                  className="bg-white mt-5"
                >
                  X
                </button>
              </div>
            </div>
          ))}
      </div>

      <button type="button" 
      onClick={addSize} 
      className="bg-white items-center">
        {addItemSize}
      </button>
    </div>
  );
}

export default MenuItemPriceProps;
