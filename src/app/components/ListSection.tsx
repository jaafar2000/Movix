"use client";

import React from "react";
import Image from "next/image";
interface Props {
  label?: string;
  show: show[];
}

interface show {
  id: number;
  first_air_date: string;
  name: string;
  original_title: string;
  original_language: string;
  original_name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
}

const ListSection = ({ label, show }: Props) => {
  return (
    <div className="w-full text-cgray mb-10  ">
      <p className=" border-cgray border-b-[0.5px] pb-2 ">{label}</p>

      <div className="flex flex-row gap-2 my-5">
        {show &&
          show.slice(0, 5).map((show: show) => (
            <div key={show?.id} className=" overflow-hidden ">
              <div className="relative cursor-pointer group overflow-hidden rounded-sm ">
                <div className=" relative ">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show?.poster_path}`}
                    alt={show?.original_name || "image"}
                    width={1000}
                    height={1000}
                    className=" object-cover "
                  />
                </div>
                <div className="absolute inset-0 w-full h-full bg-black/50 transition-transform duration-300 translate-y-full group-hover:translate-y-0" />
                <div className="bg-cardgray p-1 font-bold">
                  {show?.original_title?.length > 8
                    ? show.original_title.slice(0, 8) + "..."
                    : (show?.original_title || show?.name || "Untitled")
                        ?.length > 8
                    ? (show?.original_title || show?.name || "Untitled").slice(
                        0,
                        8
                      ) + "..."
                    : show?.original_title || show?.name || "Untitled"}
                </div>
              </div>
              <div className="flex  text-[#667788] flex-row justify-between text-xs ">
                <span> {show?.vote_average.toFixed(1)}/10</span>
                <span>{show?.first_air_date}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListSection;
