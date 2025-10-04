"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ShowCard from "./ShowCard";
import ReviewCard from "./ReviewCard";
import { Show, User, Review } from "../../type";
import { SignOutButton, useUser, useClerk } from "@clerk/nextjs";

interface Props {
  user?: User;
}

const TABS = ["Watchlist", "Favourites", "Watched", "Reviews"];

const UserDetails = ({ user }: Props) => {
  const { openUserProfile } = useClerk();
  const { user: currentUser } = useUser();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [activeTab, setActiveTab] = useState("Watchlist");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (currentUser?.id && user?.clerkId) {
      setIsCurrentUser(currentUser.id === user.clerkId);
    }
  }, [currentUser?.id, user?.clerkId]);

  useEffect(() => {
    if (!user?.clerkId) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) {
          console.log("Failed fetching reviews");
          return [];
        }
        const data: Review[] = await res.json();
        return data.filter((x) => x.author?.clerkId === user.clerkId);
      } catch (err) {
        console.log("Error fetching reviews", err);
        return [];
      }
    };

    fetchReviews().then(setReviews).catch(console.log);
  }, [user?.clerkId]);

  if (!user) return <div />;

  const getItems = (): Show[] => {
    switch (activeTab) {
      case "Watchlist":
        return user.listsToWatch || [];
      case "Favourites":
        return user.favourite || [];
      case "Watched":
        return user.watched || [];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* User Info */}
      <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0">
          <Image
            src={user.image_url || "/default-avatar.png"}
            alt="avatar"
            width={130}
            height={130}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-cgray">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-cgray">@{user.username}</p>
          <p className="text-sm text-[var(--color-cgray)] mt-1">
            Joined{" "}
            {user?.createdAt &&
              new Date(user.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </p>
          <div className="flex justify-center sm:justify-start gap-6 mt-2 text-sm text-cgray">
            <span>
              <span className="font-semibold">{user.followers?.length || 0}</span> Followers
            </span>
            <span>
              <span className="font-semibold">{user.following?.length || 0}</span> Following
            </span>
          </div>
        </div>

        {isCurrentUser && (
          <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => openUserProfile()}
              className="px-4 py-2 rounded bg-cgreen text-white w-full sm:w-auto"
            >
              Edit Profile
            </button>
            <SignOutButton>
              <button className="px-4 py-2 rounded bg-red-600 text-white w-full sm:w-auto hover:bg-red-700 transition">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-10 px-0 sm:px-6">
        <div className="flex flex-wrap gap-4 border-b border-[var(--color-cgraysearch)] mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-lg font-medium transition-colors ${
                activeTab === tab
                  ? "text-[var(--color-corange)] border-b-2 border-[var(--color-corange)]"
                  : "text-cgray hover:text-[var(--color-corange)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "Reviews" ? (
          <div className="flex flex-col gap-6">
            {reviews.length > 0 ? (
              reviews.map((x) => <ReviewCard key={x._id} review={x} />)
            ) : (
              <p className="text-cgray">No reviews yet.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {getItems().map((show, idx) => (
              <ShowCard
                key={show.tmdbId || idx}
                name={show.name}
                image_url={show.image_url}
                type={show.type}
                vote_average={show.rating ? parseFloat(show.rating) : undefined}
                createdAt={show.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
