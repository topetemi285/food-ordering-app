"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import UserTabs from "../../components/layout/Tabs";
import Link from "next/link";
import UserProfile from "../../hooks/UserProfile";
import Image from "next/image";

function MenuItem() {
  const [menuItem, setMenuItem] = useState([]);
  const { loading, data } = UserProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItem) => {
        setMenuItem(menuItem);
      });
    });
  }, []);

  if (loading) {
    return "Loading User Info....";
  }

  if (!data) {
    return "User not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-4xl">
      {/* <UserTabs isAdmin={true} /> */}
      <div className="mt-8 mb-10">
        <Link className="button flex " href={"/menu-items/new"}>
          Create new Menu Item
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-4">Edit Menu Item:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItem?.length > 0 &&
            menuItem.map((item) => (
              <div
                key={item._id}
                className="bg-gray-200 max-w-52 rounded-lg p-4"
              >
                <Link href={"/menu-items/edit/" + item._id}>
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="mt-5 text-center font-semibold">
                    {item.name}
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MenuItem;
