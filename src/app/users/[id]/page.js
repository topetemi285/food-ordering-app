"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../../../components/layout/Tabs";
import UseProfile from "../../../hooks/UserProfile";
import { useParams } from "next/navigation";
import UserForm from "../../../components/layout/UserForm";
import toast from "react-hot-toast";

function EditUserProfile() {
  const { loading, data } = UseProfile();
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        // const user = users.find((u) => u._id === id);
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "loading",
      success: "updated",
      error: "error!",
    });
  }

  if (loading) {
    return "User Loading";
  }
  if (!data.admin) {
    return "You are not an Admin";
  }
  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}

export default EditUserProfile;
