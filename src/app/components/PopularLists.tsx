"use client";

import {
  FetchTopMovies,
  FetchUpcomings,
  FetchNowPlaying,
} from "@/actions/actions";
import React, { useState, useEffect } from "react";
import ListCards from "./ListCards";

const PopularLists = () => {
  const [topMovies, setTopMovies] = useState<[]>([]);
  const [upcoming, setUpcoming] = useState<[]>([]);
  const [nowPlaying, setNowPlaying] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const topMoviesData = await FetchTopMovies();
      const upcomingMovies = await FetchUpcomings();
      const nowPlayingData = await FetchNowPlaying();

      setTopMovies(topMoviesData.results ?? []);
      setUpcoming(upcomingMovies.results ?? []);
      setNowPlaying(nowPlayingData.results ?? []);
    };
    fetchData();
  }, []);

  console.log("topMovies", topMovies);
  return (
    <div className="w-full text-cgray mb-10  ">
      <p className=" border-cgray border-b-[0.5px] pb-2 ">POPULAR LISTS</p>
      <div className="flex flex-row justify-between">
        <ListCards
          topMovies={topMovies}
          desc="Official Top 250 Narrative Feature Films"
        />

        <ListCards
          topMovies={upcoming}
          desc="Official list of movies that will be released soon"
        />

        <ListCards
          topMovies={nowPlaying}
          desc="Official list of movies that are currently in theatres.

"
        />
      </div>
    </div>
  );
};

export default PopularLists;
