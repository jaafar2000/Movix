"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getMovieDetails,
  fetchMovieTrailer,
  getTvShowDetails,
  fetchTvShowTrailer,
} from "@/actions/FetchData";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import { Heart, Bookmark, Play, X, Eye, Check } from "lucide-react";
import ShowCredits from "@/app/components/ShowCredits";
import Reviews from "@/app/components/Reviews";
import { PostReview } from "@/app/components/PostReview";
import { Show, Movie } from "@/type";
const Page: React.FC = () => {
  const params = useParams();
  const Id = Array.isArray(params?.typeId) ? params.typeId[0] : params?.typeId;
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type;

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [data, setData] = useState<Movie | Show | null>(null);
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);

  useEffect(() => {
    if (!type || !Id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        let details;
        let tr;

        if (type === "movies") {
          details = await getMovieDetails(Id);
          tr = await fetchMovieTrailer(Id);
        } else if (type === "tv-shows") {
          details = await getTvShowDetails(Id);
          tr = await fetchTvShowTrailer(Id);
        } else {
          console.error("Unknown type:", type);
          setData(null);
          setTrailer(null);
          setLoading(false);
          return;
        }

        setData(details);
        setTrailer(tr);
      } catch (err) {
        console.error("Error fetching data:", err);
        setData(null);
        setTrailer(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/users/currentUser");
        const userData = await res.json();
        if (!res.ok) throw new Error(userData.msg || "Failed to fetch user");

        const isWatchlisted = !!userData.user?.listsToWatch?.some(
          (show: Show) => String(show.tmdbId) === Id
        );
        const isWatched = !!userData.user?.watched?.some(
          (show: Show) => String(show.tmdbId) === Id
        );
        setIsFav(isFav);
        setIsWatchlisted(isWatchlisted);
        setIsWatched(isWatched);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    fetchCurrentUser();
  }, [type, Id, isFav]);

  const style =
    "relative cursor-pointer transition before:block before:absolute before:-bottom-8 before:left-1/2 before:-translate-x-1/2 before:bg-cardgray before:text-white before:rounded before:text-sm before:py-1 before:opacity-0 hover:before:opacity-100 before:transition-opacity";

  const toggleHandler = async (
    route: string,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!data || !Id) return;
    try {
      const res = await fetch(`/api/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: Id,
          image_url: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
          name: data?.title || data?.name,
          type: type,
        }),
      });

      if (res.ok) {
        stateSetter((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <p className="text-white text-center mt-20 px-4">
        No data found for this {type}.
      </p>
    );
  }

  const displayTitle = data.title || data.name;
  const displayDate =
    type === "movies" ? data.release_date : data.first_air_date;
  const runtime = type === "movies" ? data.runtime : data.episode_run_time?.[0];

  return (
    <>
      <div className="relative mt-10 w-full p-4 md:p-10">
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={`${displayTitle} cover`}
          width={1920}
          height={1080}
          className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] opacity-20"
        />

        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-4">
          <div className="relative w-48 sm:w-64 min-w-[150px] md:min-w-[250px] shadow-lg rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={`${displayTitle} poster`}
              width={500}
              height={750}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="mt-6 md:ml-8 text-white max-w-3xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {displayTitle}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 my-3 text-sm font-semibold text-gray-300">
              {displayDate && <span>{displayDate}</span>}

              {data?.genres?.map((g: { id: number; name: string }) => (
                <span key={g.id} className="text-gray-400">
                  • {g.name}
                </span>
              ))}

              {runtime && (
                <span>
                  • {Math.floor(runtime / 60)}h {runtime % 60}m
                </span>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 mb-4 mt-6">
              <button
                data-text="Add To List"
                className={`${style} before:content-[attr(data-text)] before:w-[100px]`}
                onClick={() => toggleHandler("addToWatched", setIsWatched)}
              >
                {isWatched ? (
                  <Eye size={24} strokeWidth={3} color="#00ac1c" />
                ) : (
                  <Eye size={24} strokeWidth={3} />
                )}
              </button>

              <button
                data-text="Mark as favorite"
                className={`${style} before:content-[attr(data-text)] before:w-[110px]`}
                onClick={() => toggleHandler("addToFavourite", setIsFav)}
              >
                <Heart
                  size={24}
                  strokeWidth={3}
                  fill={isFav ? "#ff8000" : "none"}
                  className={isFav ? "text-[#ff8000]" : "text-wh"}
                />
              </button>

              <button
                data-text="Add to your watchlist"
                className={`${style} before:content-[attr(data-text)] before:w-[150px]`}
                onClick={() =>
                  toggleHandler("addToWatchList", setIsWatchlisted)
                }
              >
                {isWatchlisted ? (
                  <Check size={24} strokeWidth={3} />
                ) : (
                  <Bookmark size={24} strokeWidth={3} />
                )}
              </button>

              {trailer && (
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-cgreen px-4 py-2 rounded cursor-pointer transition"
                >
                  <Play size={20} /> Play Trailer
                </button>
              )}
            </div>

            {data.tagline && (
              <p className="italic text-gray-400 mb-4 text-sm sm:text-base">
                &quot;{data.tagline}&quot;
              </p>
            )}

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Overview
              </h2>
              <p className="text-gray-200 text-sm sm:text-base">
                {data.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ShowCredits
        type={type === "movies" ? "movie" : "tv"}   
        showId={data?.id}
      />
      <Reviews type={type === "movies" ? "movie" : "tv"} showId={data?.id || ""}  />
      <PostReview
        showId={data?.id}
        image_url={data?.poster_path}
        name={displayTitle}
        type={type}
      />

      {showModal && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              className="absolute -top-6 border-4 border-gray-300 rounded-full cursor-pointer -right-6 text-gray-300 hover:text-white hover:border-white transition-all ease-in-out duration-150 text-2xl z-10"
              onClick={() => setShowModal(false)}
            >
              <X size={30} strokeWidth={4} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={`${displayTitle} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
