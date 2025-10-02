"use client";

import React, { useState, useEffect } from "react";
import {
  fetchTrendingTvShows,
  fetchPopularTvShows,
  fetchAiringTodayTvShows,
  fetchTopRatedTvShows,
  fetchOnTheAirTvShows,
} from "@/actions/FetchData";
import ListSection from "../components/ListSection";

const Page = () => {
  const [trendingTvShows, setTrendingTvShows] = useState<[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<[]>([]);
  const [airingTodayTvShows, setAiringTodayTvShows] = useState<[]>([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState<[]>([]);
  const [onTheAirTvShows, setOnTheAirTvShows] = useState<[]>([]);

  useEffect(() => {
    const fetch = async () => {
      await fetchTrendingTvShows().then((data) => setTrendingTvShows(data));
      await fetchPopularTvShows().then((data) => setPopularTvShows(data));
      await fetchAiringTodayTvShows().then((data) =>
        setAiringTodayTvShows(data)
      );
      await fetchTopRatedTvShows().then((data) => setTopRatedTvShows(data));
      await fetchOnTheAirTvShows().then((data) => setOnTheAirTvShows(data));
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <p className="text-cgray text-center uppercase my-5 text-xl md:text-2xl px-4">
        MILLIONS OF MOVIES, TV SHOWS AND PEOPLE TO DISCOVER. EXPLORE NOW.
      </p>
      <ListSection
        label="TRENDING TV SHOWS"
        type="tv-shows"
        show={trendingTvShows}
      />
      <ListSection
        label="POPULAR TV SHOWS"
        type="tv-shows"
        show={popularTvShows}
      />
      <ListSection
        label="AIRING TODAY"
        type="tv-shows"
        show={airingTodayTvShows}
      />
      <ListSection
        label="TOP RATED TV SHOWS"
        type="tv-shows"
        show={topRatedTvShows}
      />
      <ListSection label="ON THE AIR" type="tv-shows" show={onTheAirTvShows} />
    </div>
  );
};

export default Page;