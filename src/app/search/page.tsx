"use client";

import React, { useEffect, useState } from "react";
import { searchMovies } from "@/actions/FetchData";
import Link from "next/link";
import Image from "next/image";

interface Show {
  id: number;
  title: string;
  name: string;
  poster_path?: string;
  original_title?: string;
  original_name?: string;
  original_language?: string;
  overview?: string;
  vote_average?: number;
  first_air_date?: string;
  release_date?: string;
}

const Page = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Show[]>([]);
  const [type, setType] = useState<"movie" | "tv">("movie");

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        setData([]);
        return;
      }
      try {
        const results = await searchMovies(type, query);
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, [query, type]);

  const getTitle = (item: Show) => {
    return (
      item?.original_title || item?.name || item?.original_name || "Untitled"
    );
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="h-[200px] sm:h-[300px] flex flex-col justify-center items-center text-center">
        <p className="text-cgray uppercase my-5 text-lg md:text-2xl px-4">
          Discover. Search through thousands of movies, TV shows, and stars.
          Start exploring today.
        </p>
        <div className="w-full max-w-lg mx-auto flex border border-cgray rounded-lg overflow-hidden bg-[#1a1d21]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-white placeholder-cgray"
          />

          <div className="flex">
            <button
              onClick={() => setType("movie")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                type === "movie"
                  ? "bg-cgreen text-white"
                  : "bg-[#2a2f34] text-gray-300 hover:bg-[#33383d]"
              }`}
            >
              Movie
            </button>
            <button
              onClick={() => setType("tv")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                type === "tv"
                  ? "bg-cgreen text-white"
                  : "bg-[#2a2f34] text-gray-300 hover:bg-[#33383d]"
              }`}
            >
              TV
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center sm:justify-start">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="w-[120px] sm:w-[150px] flex-shrink-0">
              <Link
                href={`${type === "movie" ? "movies" : "tv-shows"}/${item.id}`}
              >
                <div className="relative cursor-pointer group rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                    alt={getTitle(item)}
                    width={500}
                    height={750}
                    className="object-cover h-auto w-full"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-end p-2 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-xs sm:text-sm font-medium">
                      {item.overview?.slice(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="bg-cardgray p-2 font-bold text-sm truncate">
                {getTitle(item)}
              </div>
              <div className="flex flex-row justify-between items-center text-[#667788] text-xs mt-1">
                {item.vote_average && (
                  <span>⭐ {item.vote_average.toFixed(1)}/10</span>
                )}
                {item.first_air_date && (
                  <span>{item.first_air_date.split("-")[0]}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-cgray text-center w-full py-10">
            No shows to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
