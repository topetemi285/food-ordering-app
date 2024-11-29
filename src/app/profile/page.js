"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/layout/SectionHeader";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../../components/layout/Tabs";
import UserForm from "../../components/layout/UserForm";

function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState();
  const [profileFetched, setProfileFetched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInforUpddate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  console.log(session);

  if (status === "loading" || !profileFetched) {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect('/login');
  }

  // const userImage = session.data.user?.image;

  return (
    <section className="mt-6">
      {/* <UserTabs isAdmin={isAdmin} /> */}
      <div className="max-w-lg mx-auto">
        <div className="text-center mt-8">
          <SectionHeader title={"PROFILE"} />
          <UserForm user={user} onSave={handleProfileInforUpddate} />
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
