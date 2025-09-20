"use client";
import React from "react";
import Image from "next/image";
import {
  SignedOut,
  UserButton,
  SignedIn,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Search } from "lucide-react";

import Link from "next/link";

const Nav = () => {
  const hovorStyle =
    "hover:cursor-pointer hover:text-white transition duration-300 ease-in-out";
  return (
    <div
      className={`   nav  flex items-center justify-between flex-row text-cgray  py-3   `}
    >
      {/* logo */}
      <Link
        href={"/"}
        className={`  ${hovorStyle} flex  items-end justify-center gap-2 text-5xl`}
      >
        <div className={`h-[50px] w-[50px] overflow-hidden `}>
          <Image
            src="/logo.png"
            alt="logo"
            width={1000}
            height={1000}
            className=" relative object-contain"
          />
        </div>
        <span>Movix</span>
      </Link>
      {/* links */}

      <div className={`flex flex-row items-center   gap-5`}>
        <SignedIn>
          <Link href={"/films"} className={`${hovorStyle}`}>
            FILMS
          </Link>
          <Link href={"/lists"} className={`${hovorStyle}`}>
            LISTS
          </Link>
          <Link href={"/members"} className={`${hovorStyle}`}>
            MEMBERS
          </Link>
        </SignedIn>
        {/* search */}

        {/* check SignedIn */}

        <div className="flex gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className={`${hovorStyle}`}>SIGN IN</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={`${hovorStyle}`}>CREATE ACCOUNT</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <SignedIn>
          <Link
            href={"/search"}
            className={`${hovorStyle} flex flex-row items-center gap-1 `}
          >
            {/* className="flex items-center bg-cgraysearch p-2 rounded-full" */}
            {/* <input className=" outline-none border-0 " type="text" />
          <Search /> */}
            <Search size={20} />
            SEARCH
          </Link>
        </SignedIn>
      </div>
    </div>
  );
};

export default Nav;
