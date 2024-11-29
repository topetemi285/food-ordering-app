"use client";
import React from "react";
import UseProfile from "../../../hooks/UserProfile";
import UserTabs from "../../../components/layout/Tabs";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import toast from "react-hot-toast";

function NewMenuItem() {
  const { loading, data } = UseProfile();
  const [redirectToItem, setRedirectToItem] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved successfully!",
      error: "Error saving item!",
    });
    setRedirectToItem(true);
  }

  if (redirectToItem) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "LOading User Information...";
  }

  if (!data.admin) {
    return "Not an Admin";
  }
  return (
    <section className="mt-8">
      {/* <UserTabs isAdmin={true} /> */}
      <div className="mt-8 max-w-lg mx-auto">
        <Link href={"/menu-items"} className="button flex">
          <span>Show All Menu Items</span>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
}

export default NewMenuItem;
