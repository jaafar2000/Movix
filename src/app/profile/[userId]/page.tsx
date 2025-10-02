"use client";

import React, { useState, useEffect } from "react";
import UserDetails from "@/app/components/UserDetails";
import Loader from "@/app/components/Loader";
import { User } from "@/type";
import { useParams } from "next/navigation";

const Page = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${userId}`);

        if (!res.ok) {
          console.log("error fetching user ");
        }
        const data = await res.json();
        setLoading(false);
        console.log("data", data);
        return data;
      } catch (err) {
        console.log("error from catch block error fetching user", err);
      }
    };

    fetchUser().then((data) => setUser(data));
  }, [userId]);

  return (
    <div className="min-h-screen p-4">
      {loading ? (
        <div className=" w-full min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
};

export default Page;
