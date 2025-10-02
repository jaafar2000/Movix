"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Nav = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>("reviews"); // default

  const activeStyle = "text-white ";
  const hoverStyle =
    " hover:border-b-cgray hover:cursor-pointer hover:text-white transition duration-300 ease-in-out";

  const navItems = [
    { key: "reviews", label: "People Reviews", href: "/peoples-review" },
    { key: "movies", label: "Films", href: "/movies" },
    { key: "tv", label: "Tv Shows", href: "/tv-shows" },
    { key: "members", label: "Members", href: "/members" },
  ];

  return (
    <div className="nav flex items-center justify-between flex-row text-cgray py-3">
      {/* logo */}
      <Link
        href={"/"}
        onClick={() => setActiveTab("home")}
        className="flex items-end justify-center gap-2 text-5xl"
      >
        <div className="h-[50px] w-[50px] overflow-hidden">
          <Image
            src="/logo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="relative object-contain"
          />
        </div>
        <span>Movix</span>
      </Link>

      {/* links */}
      <div className="flex flex-row items-center gap-5">
        <SignedIn>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setActiveTab(item.key)}
              className={`${hoverStyle} ${
                activeTab === item.key ? activeStyle : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </SignedIn>

        {/* auth + profile */}
        <div className="flex gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className={hoverStyle}>SIGN IN</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={hoverStyle}>CREATE ACCOUNT</button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link href={"/profile"} onClick={() => setActiveTab("profile")}>
              <div className="relative w-[30px] h-[30px] overflow-hidden rounded-full">
                <Image
                  src={user?.imageUrl || "/blank.png"}
                  alt={user?.username || "user image"}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </Link>
          </SignedIn>
        </div>

        {/* search */}
        <SignedIn>
          <Link
            href={"/search"}
            onClick={() => setActiveTab("search")}
            className={`${hoverStyle} flex flex-row items-center gap-1 ${
              activeTab === "search" ? activeStyle : ""
            }`}
          >
            <Search size={20} />
            Search
          </Link>
        </SignedIn>
      </div>
    </div>
  );
};

export default Nav;
