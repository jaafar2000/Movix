"use client";
import React from "react";
import Image from "next/image";
interface topMovies {
  topMovies: [];
  desc?: string;
  ListType?: string;
}

interface movie {
  poster_path: string;
}

const ListCards = ({ topMovies, desc, ListType }: topMovies) => {
  return (
    <div className="mt-4">
      <p>{ListType}</p>

      <div className="flex -space-x-7 ">
        {topMovies &&
          topMovies.slice(0,5).map((m: movie) => (
            <div
              key={m.poster_path}
              className="w-20 h-32 relative rounded-sm overflow-hidden  border-2 border-black"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`}
                alt={m.poster_path || "image"}
                fill
                className="object-cover"
              />
            </div>
          ))}
      </div>
      <p className="text-sm text-gray-400 break-words truncate opacity-50 ">
        {desc}
      </p>
    </div>
  );
};

export default ListCards;
