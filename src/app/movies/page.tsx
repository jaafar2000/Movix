"use client";

import React, { useEffect, useState } from "react";
import {
  FetchTopMovies,
  FetchNowPlaying,
  FetchUpcomings,
  fetchTrending,
} from "@/actions/actions";
import ListSection from "../components/ListSection";
import { Loader } from "lucide-react";

const Page = () => {
  const [topMovies, setTopMovies] = useState<[]>([]);
  const [nowPlaying, setNowPlaying] = useState<[]>([]);
  const [upcomings, setUpcomings] = useState<[]>([]);
  const [trending, setTrending] = useState<[]>([]);

  useEffect(() => {
    const fetch = async () => {
      await FetchTopMovies().then((data) => setTopMovies(data.results));
      await FetchNowPlaying().then((data) => setNowPlaying(data.results));
      await FetchUpcomings().then((data) => setUpcomings(data.results));
      await fetchTrending().then((data) => setTrending(data.results));
    };
    fetch();
  }, []);

  if (!topMovies.length || !nowPlaying.length || !upcomings.length) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen p-4">
      <p className="text-cgray text-center uppercase my-5 text-xl md:text-2xl px-4">
        Millions of movies, TV shows and people to discover. Explore now.
      </p>
      <ListSection label={"Top Movies"} type="movies" show={topMovies} />
      <ListSection label={"Now Playing"} type="movies" show={nowPlaying} />
      <ListSection label={"Upcomings MOVIES"} type="movies" show={upcomings} />
      <ListSection label={"TRENDING MOVIES"} type="movies" show={trending} />
    </div>
  );
};

export default Page;
