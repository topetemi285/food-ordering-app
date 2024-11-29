"use client";
import React from "react";
import UserTabs from "../../components/layout/Tabs";
import { useEffect, useState } from "react";
import UserProfile from "../../hooks/UserProfile";
import toast from "react-hot-toast";
import { resolve } from "path";
import DeleteButton from "../../components/DeleteButton";
import { FaEdit } from "react-icons/fa";

function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  //renaming data and loading
  const { data: profileData, loading: profileLoading } = UserProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    await fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleNewCategorySubmit(ev) {
    ev.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: newCategoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setNewCategoryName("");
      fetchCategories();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating Category..."
        : "Creating your new categories...",
      success: editedCategory ? "Category Updated...." : "Category Created",
      error: "Error, Sorry...",
    });
  }
  async function handleDelete(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Category Deleting",
      success: "Category deleted",
      error: "Error Occur",
    });

    //more of refreshing the page
    fetchCategories();
  }

  if (profileLoading) {
    return "LOading Indformation...";
  }
  if (!profileData.admin) {
    return "Not an Admin";
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      {/* <UserTabs isAdmin={true} /> */}
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category" : "New Category Name"}
              {editedCategory && <b> : {editedCategory.name}</b>}
            </label>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-blue-950" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setNewCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt- text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((category) => (
            <div
              key={category}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1"
            >
              <div className="grow">{category.name}</div>

              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditedCategory(category);
                    setNewCategoryName(category.name);
                  }}
                >
                  <FaEdit />
                </button>
                <DeleteButton 
                // label="Delete" 
                onDelete={handleDelete} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default CategoriesPage;
