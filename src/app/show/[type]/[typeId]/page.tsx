"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import ShowCredits from "@/app/components/ShowCredits";
import Reviews from "@/app/components/Reviews";
import { PostReview } from "@/app/components/PostReview";
import { Heart, Bookmark, Play, X, Eye, Check } from "lucide-react";
import {
  getMovieDetails,
  fetchMovieTrailer,
  getTvShowDetails,
  fetchTvShowTrailer,
  getTvShowDetailsSeasons,
  getTvSeasonEpisodes,
} from "@/actions/FetchData";
import { Movie, Show , season, episodes} from "@/type";

const Page: React.FC = () => {
  const params = useParams();
  const Id = Array.isArray(params?.typeId) ? params.typeId[0] : params?.typeId;
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type;

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [data, setData] = useState<Movie | Show | null>(null);
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);

  const [seasons, setSeasons] = useState<season[]>([]);
  const [episodes, setEpisodes] = useState<episodes[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  useEffect(() => {
    if (!type || !Id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        let details: Movie | Show | null = null;
        let tr: { key: string } | null = null;

        if (type === "movies") {
          details = await getMovieDetails(Id);
          tr = await fetchMovieTrailer(Id);
        } else if (type === "tv-shows") {
          details = await getTvShowDetails(Id);
          tr = await fetchTvShowTrailer(Id);

          try {
            const seasonsData = await getTvShowDetailsSeasons(Id);
            setSeasons(seasonsData.seasons || []);
          } catch (err) {
            console.error("Error fetching seasons:", err);
            setSeasons([]);
          }
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

        setIsWatchlisted(
          !!userData.user?.listsToWatch?.some(
            (show: Show) => String(show.tmdbId) === String(Id)
          )
        );
        setIsWatched(
          !!userData.user?.watched?.some(
            (show: Show) => String(show.tmdbId) === String(Id)
          )
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    fetchCurrentUser();
  }, [type, Id]);

  // Season Click Handler
  const handleSeasonClick = async (season_number: number) => {
    if (!Id) return;
    setEpisodesLoading(true);
    try {
      const eps = await getTvSeasonEpisodes(Id, season_number);
      setEpisodes(eps || []);
    } catch (err) {
      console.error("Error fetching episodes:", err);
      setEpisodes([]);
    } finally {
      setEpisodesLoading(false);
    }
  };

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
          type,
        }),
      });

      if (res.ok) {
        stateSetter((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;
  if (!data)
    return (
      <p className="text-white text-center mt-20 px-4">
        No data found for this {type}.
      </p>
    );

  const displayTitle = data.title || data.name;
  const displayDate =
    type === "movies" ? data.release_date : data.first_air_date;
  const runtime = type === "movies" ? data.runtime : data.episode_run_time?.[0];

  const buttonStyle =
    "relative cursor-pointer transition before:block before:absolute before:-bottom-8 before:left-1/2 before:-translate-x-1/2 before:bg-cardgray before:text-white before:rounded before:text-sm before:py-1 before:opacity-0 hover:before:opacity-100 before:transition-opacity";

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-20 flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="w-full md:w-1/4 flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={`${displayTitle} poster`}
              width={500}
              height={750}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-2">{displayTitle}</h1>

            <div className="flex flex-wrap items-center gap-2 text-gray-300 text-sm font-medium mb-4">
              {displayDate && <span>{displayDate}</span>}
              {data?.genres?.map((g) => (
                <span key={g.id}>• {g.name}</span>
              ))}
              {runtime && (
                <span>
                  • {Math.floor(runtime / 60)}h {runtime % 60}m
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                data-text="Mark as watched"
                className={`${buttonStyle} before:content-[attr(data-text)] before:w-[120px]`}
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
                className={`${buttonStyle} before:content-[attr(data-text)] before:w-[120px]`}
                onClick={() => toggleHandler("addToFavourite", setIsFav)}
              >
                <Heart
                  size={24}
                  strokeWidth={3}
                  fill={isFav ? "#ff8000" : "none"}
                  className={isFav ? "text-[#ff8000]" : "text-white"}
                />
              </button>

              <button
                data-text="Add to Watchlist"
                className={`${buttonStyle} before:content-[attr(data-text)] before:w-[140px]`}
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
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition"
                >
                  <Play size={20} /> Play Trailer
                </button>
              )}
            </div>

            {/* Tagline */}
            {data.tagline && (
              <p className="italic text-gray-400 mb-6 text-lg">
                “{data.tagline}”
              </p>
            )}

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-200 leading-relaxed">{data.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TV Seasons & Episodes */}
      {type === "tv-shows" && (
        <div className="max-w-7xl mx-auto px-4 md:px-10 mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Seasons</h2>
          <div className="flex flex-wrap gap-6">
            {seasons.map((season: season) => (
              <div
                key={season.id}
                className="bg-gray-800 rounded-lg p-4 flex-shrink-0 w-40 cursor-pointer"
                onClick={() => handleSeasonClick(season.season_number)}
              >

                <Image
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                      : "/no-image-available.png"
                  }
                  alt={season.name}
                  width={160}
                  height={240}
                  className="rounded-md mb-2 object-cover"
                />
                <h3 className="text-white font-medium text-sm">{season.name}</h3>
                <p className="text-gray-400 text-xs">
                  {season.episode_count} Episodes
                </p>
              </div>
            ))}
          </div>

          {episodesLoading && <p className="text-white mt-4">Loading episodes...</p>}

          {episodes.length > 0 && !episodesLoading && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Episodes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {episodes.map((ep: episodes) => (
                  <div key={ep.id} className="bg-gray-800 rounded-lg p-4">
                    <Image
                      src={
                        ep.still_path
                          ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                          : "/no-image-available.png"
                      }
                      alt={ep.name}
                      width={300}
                      height={169}
                      className="rounded-md mb-2 object-cover"
                    />
                    <h3 className="text-white font-medium text-sm">
                      {ep.episode_number}. {ep.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      Air Date: {ep.air_date || "N/A"}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {ep.overview || "No overview available."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Credits & Reviews */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-12">
        <ShowCredits type={type === "movies" ? "movie" : "tv"} showId={data.id} />
        <Reviews type={type === "movies" ? "movie" : "tv"} showId={data.id} />
        <PostReview
          showId={data.id}
          image_url={data.poster_path}
          name={displayTitle}
          type={type}
        />
      </div>

      {/* Trailer Modal */}
      {showModal && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              className="absolute -top-6 -right-6 border-4 border-gray-300 rounded-full cursor-pointer text-gray-300 hover:text-white hover:border-white transition"
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
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
