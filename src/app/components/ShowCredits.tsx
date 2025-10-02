"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CreditsResponse {
  cast: Cast[];
  crew: Cast[];
}

interface Props {
  showId?: string | number;
  type?: string;
}

const ShowCredits = ({ showId, type }: Props) => {
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  useEffect(() => {
    if (!showId || !type) return;

    const fetchCredits = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${showId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        if (!res.ok) {
          console.log("Failed to fetch credits");
          return;
        }
        const data = await res.json();
        setCredits(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCredits();
  }, [showId, type]);
  return (
    <div className="mt-6">
      <p className="text-2xl font-semibold mb-3">Top Billed Cast</p>

      <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
        {credits?.cast.map((actor, index) => (
          <div
            key={`credits${actor.id}${actor?.character}${index}`}
            className="w-40 flex-shrink-0 my-2  bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={
                actor?.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : "/blank.png"
              }
              alt={actor?.name || "Actor photo"}
              width={160}
              height={240}
              className="w-full h-56 object-cover"
            />

            <div className="p-2">
              <p className="font-semibold text-sm truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">
                as {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-2xl font-semibold mb-3">Top Billed Crew</p>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
        {credits?.crew.map((actor, index) => (
          <div
            key={`crew${actor.id} + ${index}`}
            className="w-40 flex-shrink-0 my-2  bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={
                actor?.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : "/blank.png"
              }
              alt={actor?.name || "Actor photo"}
              width={160}
              height={240}
              className="w-full h-56 object-cover"
            />

            <div className="p-2">
              <p className="font-semibold text-sm truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">
                as {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCredits;
