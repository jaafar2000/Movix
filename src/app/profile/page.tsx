"use client";

import React, { useState, useEffect } from "react";
import UserDetails from "../components/UserDetails";
import Loader from "../components/Loader";
import { User } from "../../type";

const Page = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/currentUser");
        if (!res.ok) {
          console.error("Error fetching user");
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error from catch block fetching user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen p-4">
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
};

export default Page;
