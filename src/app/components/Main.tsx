"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ListSection from "./ListSection";
import { fetchTrendingMovies, fetchTrendingTvShows } from "@/actions/FetchData";
import PopularLists from "./PopularLists";

const Main = () => {
  const [movies, setMovies] = useState<[]>([]);
  const [tvShows, setTvShows] = useState<[]>([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
    fetchTrendingTvShows().then(setTvShows);
  }, []);

  const { user } = useUser();
  return (
    <div className="flex flex-col items-center ">
      <p className="my-10 text-2xl font-thin text-cgray ">
        Welcome {user?.firstName} Track movies, make lists, and see what friends
        are watching.
      </p>

      <ListSection label={"TRENDING MOVIES"} type="movies" show={movies} />

      <ListSection label={"TRENDING TV SHOWS"} type="tv" show={tvShows} />
      <PopularLists />
    </div>
  );
};

export default Main;
