"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/layout/SectionHeader";
import MenuItem from "../../components/menu/MenuItem";

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
      fetch("/api/menu-items").then((res) => {
        res.json().then((menuItems) => {
          setMenuItems(menuItems);
        });
      });
    });
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((cat) => (
          <div key={cat._id}>
            <div>
              <div>
                <SectionHeader title={cat.name} />
              </div>
              <div className="grid sm:grid-cols-3 mt-6 mb-12 gap-4">
                {menuItems?.length > 0 &&
                  menuItems
                    .filter((menu) => menu.categoryValue === cat._id)
                    .map((item) => (
                      <div key={item._id}>
                        <MenuItem {...item} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default MenuPage;
