"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-3 tabs justify-center">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={path.includes("menu-items") ? "active" : ""}
            href={"/menu-items"}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes("users") ? "active" : " "}
            href={"/users"}
          >
            Users
          </Link>
          <Link className={path === "/order" ? "active" : " "} href={"/order"}>
            Order
          </Link>
          {/* <Link href={'/categories'}>Categories</Link> */}
        </>
      )}
    </div>
  );
}

export default UserTabs;
