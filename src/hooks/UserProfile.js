"use client";
import React from "react";
import { useState, useEffect } from "react";

function UserProfile() {
  const [data, setData] = useState(false);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    isLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        isLoading(false);
      });
    });
  }, []);
  return { data, loading };
}

export default UserProfile;
