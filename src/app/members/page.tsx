"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { User } from "@/type";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          console.error("Issue fetching users");
          return;
        }
        const data = await res.json();
        const mappedData = data.map((u: User) => ({
          ...u,
          isFollowing: u.isFollowing || false,
        }));
        setUsers(mappedData);
      } catch (err) {
        console.error("Users fetching issue:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((u) => u.clerkId !== user?.id)
    .filter((u) => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFollow = async (followId: string) => {
    try {
      const res = await fetch("/api/users/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followId }),
      });

      if (!res.ok) {
        console.error("Error following/unfollowing user");
        return;
      }

      const data = await res.json();
      setUsers((prev) =>
        prev.map((u) =>
          u._id === followId ? { ...u, isFollowing: data.following } : u
        )
      );
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{ backgroundColor: "var(--color-mainbg)" }}
    >
      <h1
        className="my-8 md:my-10 text-xl md:text-2xl font-semibold"
        style={{ color: "var(--color-cgray)" }}
      >
        Community Members
      </h1>

      <div
        className="search flex items-center gap-2 border rounded-lg w-full md:w-[300px] px-3 py-2 mt-5"
        style={{
          borderColor: "var(--color-cgray)",
          backgroundColor: "var(--color-cgraysearch)",
        }}
      >
        <Search style={{ color: "var(--color-cgray)" }} />
        <input
          type="text"
          placeholder="find friends or users"
          className="flex-1 outline-none bg-transparent text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <div
              key={u._id}
              className="flex items-center justify-between gap-4 p-4 rounded-lg"
              style={{
                backgroundColor: "var(--color-cardgray)",
                border: "1px solid var(--color-cgray)",
              }}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={u.image_url}
                  alt={u.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <Link href={`/profile/${u.clerkId}`} className="underline">
                    <span className="font-semibold text-white">
                      {u.username}
                    </span>
                  </Link>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-cgray)" }}
                  >
                    {u.first_name} {u.last_name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleFollow(u._id)}
                className={`px-4 py-1 rounded transition-colors duration-200`}
                style={{
                  backgroundColor: u.isFollowing
                    ? "var(--color-corange)"
                    : "var(--color-cgreen)",
                  color: "white",
                }}
              >
                {u.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))
        ) : (
          <p
            className="text-center w-full"
            style={{ color: "var(--color-cgray)" }}
          >
            No members found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
