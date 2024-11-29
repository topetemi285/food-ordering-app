"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";

function HomeMenu() {
  const [bestSellers, setBestSeller] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItem) => {
        setBestSeller(menuItem);
      });
    });
  }, []);

  return (
    <div className="mt-6 flex flex-col">
      <div>
        <SectionHeader title={"CHECKOUT SOME OF OUR PRODUCT"} />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item.id} {...item} />)}
      </div>
    </div>
  );
}

export default HomeMenu;
