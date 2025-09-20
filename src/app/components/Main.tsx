"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ListSection from "./ListSection";
import { fetchTrending, fetchTrendingTv } from "@/actions/actions";
import PopularLists from "./PopularLists";

const Main = () => {
  const [trending, setTrending] = useState<[]>([]);
  const [trendingTv, setTrendingTv] = useState<[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const trendingData = await fetchTrending();
      const trendingTvData = await fetchTrendingTv();

      setTrending(trendingData.results ?? []);
      setTrendingTv(trendingTvData.results ?? []);
    };
    fetchData();
  }, []);

  const { user } = useUser();
  return (
    <div className="flex flex-col items-center ">
      <p className="my-10 text-2xl font-thin text-cgray ">
        Welcome {user?.firstName} Track movies, make lists, and see what friends
        are watching.
      </p>

      <ListSection label={"TRENDING MOVIES"} show={trending} />

      <ListSection label={"TRENDING TV SHOWS"} show={trendingTv} />
      <PopularLists/>
    </div>
  );
};

export default Main;
