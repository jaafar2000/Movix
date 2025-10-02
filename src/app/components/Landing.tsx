"use client";

import React, { useEffect, useState } from "react";
import { fetchTrending } from "@/actions/actions";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
const Landing = () => {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchTrending();
      const { results } = data;
      const no = Math.floor(Math.random() * 20);
      setImage(results[no]?.backdrop_path);
    };
    fetch();
  }, []);
  return (
    <div className="mt-4 relative min-h-screen ">
      <div className="w-[80%] mx-auto h-[500px] relative ">
        <div className="w-full h-full absolute z-20 top-0 left-0 bg-gradient-to-b from-mainbg from-[5%]  via-transparent via-[90%]  to-mainbg to-[100%]"></div>{" "}
        {image ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${image}`}
            alt="landing image"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-12 h-12 border-4 border-t-cgreen border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="absolute flex flex-col items-center z-40 left-1/2 -translate-y-[50px]  -translate-x-1/2">
        <div className=" font-bold space-x-0.5 text-4xl  text-center ">
          <p>Track films you’ve watched.</p>
          <p>Save those you want to see.</p>
          <p>Tell your friends what’s good.</p>
        </div>
        <SignUpButton mode="modal">
          <button className="bg-cgreen px-3  cursor-pointer py-2 my-5 rounded-sm w-fit  ">
            Get started — it‘s free!
          </button>
        </SignUpButton>
        <p className="text-center text-xl font-thin text-cgray ">
          The social network for film lovers
        </p>
      </div>
    </div>
  );
};

export default Landing;
