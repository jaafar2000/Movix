"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ShowCardProps {
  id?: number | string;
  name?: string;
  type?: string;
  poster_path?: string; // for ListSection
  image_url?: string; // for UserDetails
  overview?: string;
  vote_average?: number;
  createdAt?: string | Date;
  route?: string; // optional route for linking
}

const ShowCard = ({
  id,
  name,
  type,
  poster_path,
  image_url,
  overview,
  vote_average,
  createdAt,
  route,
}: ShowCardProps) => {
  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : image_url || "/placeholder.png";

  const year = createdAt ? new Date(createdAt).getFullYear() : undefined;

  return (
    <div className="w-[160px] flex-shrink-0 rounded-lg overflow-hidden">
      {route && id ? (
        <Link href={`show/${route}/${id}`} className="block group">
          <div className="relative rounded-lg overflow-hidden shadow-md transition duration-300 transform group-hover:scale-105">
            <Image
              src={imageSrc}
              alt={name || "Show"}
              width={500}
              height={750}
              className="object-cover w-full h-auto"
            />
            {overview && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                <p className="text-white text-xs leading-snug line-clamp-3">
                  {overview}
                </p>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="relative cursor-pointer group rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <Image
            src={imageSrc}
            alt={name || "Show"}
            width={500}
            height={750}
            className="object-cover h-auto w-full"
          />
          {type && (
            <div className="absolute inset-0 bg-black/50 transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-end p-2 opacity-0 group-hover:opacity-100">
              <p className="text-white text-sm font-medium">{type}</p>
            </div>
          )}
        </div>
      )}

      <div className=" p-2 font-bold text-sm truncate">
        {name}
      </div>

      <div className="flex justify-between items-center text-xs text-[#667788] mt-1">
        {vote_average && <span>⭐ {vote_average.toFixed(1)}/10</span>}
        {year && <span>{year}</span>}
      </div>
    </div>
  );
};

export default ShowCard;
