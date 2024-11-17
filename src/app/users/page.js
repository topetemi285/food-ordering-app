"use client";
import React, { useState, useEffect } from "react";
import UserTabs from "../../components/layout/Tabs";
import UserProfile from "../../hooks/UserProfile";
import Link from "next/link";

function UsersPage() {
  const { loading, data } = UserProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);
  if (loading) {
    return "Users are loading...";
  }
  if (!data.admin) {
    return "you are not an Admin...";
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No Name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={'/users/'+user._id}>Edit</Link>
              </div>
              
            </div>
          ))}
      </div>
    </section>
  );
}

export default UsersPage;
