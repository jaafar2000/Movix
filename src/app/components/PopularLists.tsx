"use client";

import {
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
} from "@/actions/FetchData";
import React, { useState, useEffect } from "react";
import ListCards from "./ListCards";

const PopularLists = () => {
  const [topMovies, setTopMovies] = useState<[]>([]);
  const [upcoming, setUpcoming] = useState<[]>([]);
  const [nowPlaying, setNowPlaying] = useState<[]>([]);

  useEffect(() => {
    fetchTopRatedMovies().then(setTopMovies);
    fetchUpcomingMovies().then(setUpcoming);
    fetchNowPlayingMovies().then(setNowPlaying);
  }, []);

  console.log("topMovies", topMovies);
  return (
    <div className="w-full text-cgray mb-10  ">
      <p className=" border-cgray border-b-[0.5px] pb-2 ">POPULAR LISTS</p>
      <div className="flex flex-row justify-between">
        <ListCards
          ListType="Top Rated Movies"
          topMovies={topMovies}
          desc="Official Top 250 Narrative Feature Films"
        />

        <ListCards
          ListType="Upcoming Movies"
          topMovies={upcoming}
          desc="Official list of movies that will be released soon"
        />

        <ListCards
          ListType="Now Playing"
          topMovies={nowPlaying}
          desc="Official list of movies that are currently in theatres.

"
        />
      </div>
    </div>
  );
};

export default PopularLists;
