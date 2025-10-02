"use client";

import React, { useState } from "react";
import { SquarePen, Star } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Props {
  showId?: number;
  image_url?: string;
  name?: string;
  type?: string;
}

export const PostReview = ({ showId, image_url, name, type }: Props) => {
  const { user } = useUser();
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [posting, setPosting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!text.trim() || rating === 0) return;
    setPosting(true);

    try {
      console.log("rating", rating);
      const res = await fetch("/api/PostReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: text,
          show: showId,
          image_url: `https://image.tmdb.org/t/p/w500${image_url}`,
          name,
          type,
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error posting review:", data.error || data);
        return;
      }

      setText("");
      setRating(0);
      console.log("Review posted successfully:", data);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-5 mb-25">
      <p className="text-2xl font-semibold mb-3 flex items-center ">
        Write Review{" "}
        <span className="ml-2">
          <SquarePen />
        </span>
      </p>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* User Avatar + Input */}
        <div className="flex items-center gap-3">
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={user?.imageUrl || "/blank.png"}
              alt={user?.username || "userImage"}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 outline-none px-2 text-lg border-b border-gray-600 focus:border-cgreen bg-transparent transition"
            type="text"
            placeholder="You can start writing your review here"
          />
        </div>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={30}
              className={`cursor-pointer transition ${
                (hover || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <button
          disabled={posting}
          className={`bg-cgreen px-3 py-1 rounded-md font-bold text-white ${
            posting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {posting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
