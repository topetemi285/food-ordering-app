"use client";
import React, { useEffect } from "react";
import UseProfile from "../../../../hooks/UserProfile";
import UserTabs from "../../../../components/layout/Tabs";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "../../../../components/layout/MenuItemForm";
import DeleteButton from "../../../../components/DeleteButton";

function EditedMenuItem() {
  //get id we use params
  const { id } = useParams();

  const { loading, data } = UseProfile();
  const [redirectToItem, setRedirectToItem] = useState(false);
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleDelete() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Item Deleting",
      success: "Item Deleted",
      error: "Error!",
    });
    setRedirectToItem(true);
  }

  if (redirectToItem) {
    return redirect("/menu-items");
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-lg mx-auto">
        <Link href={"/menu-items"} className="button flex">
          <span>Show All Menu Items</span>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
      <div className="max-w-lg mx-auto mt-4">
        <div className="max-w-lg ml-auto">
          <DeleteButton label="Delete this Menu Item" onDelete={handleDelete} />
        </div>
      </div>
    </section>
  );
}

export default EditedMenuItem;
