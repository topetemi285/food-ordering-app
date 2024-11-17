"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import MenuItemPriceProps from "../../components/layout/MenuItemPriceProps";
import EditableImage from "../layout/EditableImage";

function MenuItemForm({ onSubmit, menuItem }) {
  const [name, setName] = useState(menuItem?.name || "");
  const [image, setImage] = useState(menuItem?.image || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [categoryValue, setCategoryValue] = useState(
    menuItem?.categoryValue || ""
  );
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrice, setExtraIngredientPrice] = useState(
    menuItem?.extraIngredientPrice || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          name,
          description,
          image,
          basePrice,
          sizes,
          extraIngredientPrice,
          categoryValue,
        })
      }
      className="mt-8 max-w-lg mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplate: "3fr .7fr" }}
      >
        <EditableImage link={image} setLink={setImage} />

        <div className="grow">
          <label>Item Name:</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Category:</label>
          <select
            value={categoryValue}
            onChange={(ev) => setCategoryValue(ev.target.value)}
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </select>

          {/* <select>
            {categories?.length > 0 && categories.map((category)=>{
              <option value={category._id} key={category._id}>{category.name}</option>
            })}
          </select> */}

          {/* <select>
            {categories?.length > 0 &&
              categories.map((category) => {
                <option value={category._id} key={category}>
                  {category.name}
                </option>;
              })}
          </select> */}

          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Base Price:</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />

          <MenuItemPriceProps
            props={sizes}
            name={"Sizes"}
            addItemSize={"Add Item Size"}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={"Extra Ingredient"}
            addItemSize={"Add Ingredients Prices"}
            // addLabel={"Add Ingredients Prices"}
            props={extraIngredientPrice}
            setProps={setExtraIngredientPrice}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

export default MenuItemForm;
