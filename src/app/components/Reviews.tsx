"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { CircleX, ChevronRight, ChevronLeft } from "lucide-react";
import dayjs from "dayjs";

interface Props {
  showId?: number | string;
  type?: string;
}

interface Review {
  id: number;
  author: string;
  content: string;
  url: string;
  updated_at: string;
}

interface ReviewsResponse {
  id: number;
  page: number;
  total_pages: number;
  results: Review[];
}

const Reviews = ({ showId, type }: Props) => {
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchReviews = useCallback(async () => {
    if (!showId || !type) return;
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      if (!apiKey) {
        console.error("TMDB API key is not set.");
        return;
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${showId}/reviews?api_key=${apiKey}&language=en-US`
      );

      if (!res.ok) {
        console.error("Failed to fetch reviews");
        return;
      }

      const data: ReviewsResponse = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }, [showId, type]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="mt-6  ">
        <h2 className="text-2xl font-semibold mb-3 text-white">Reviews</h2>

        {reviews?.results?.length ? (
          <div className="relative group">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 py-2 w-full hide-scrollbar"
            >
              {reviews.results.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-800 rounded-lg p-4 flex-shrink-0 w-80 sm:w-96 lg:w-[450px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white truncate max-w-[70%]">
                      {review.author}
                    </h4>
                    <span className="ml-2 text-sm text-[var(--color-cgray)]">
                      {dayjs(review.updated_at).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </div>

                  <p className="text-[var(--color-cgray)] text-sm line-clamp-4 leading-relaxed">
                    {review.content}
                  </p>

                  {review.content.length > 200 && (
                    <Button
                      variant="text"
                      onClick={() => setSelectedReview(review)}
                      className="!text-[var(--color-cgreen)] !mt-2 !normal-case !font-semibold !p-0"
                    >
                      Read More
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={() => scroll("left")}
                className="pointer-events-auto text-white cursor-pointer bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="pointer-events-auto text-white cursor-pointer bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[var(--color-cgray)]">No reviews available.</p>
        )}

        <Dialog
          open={!!selectedReview}
          onClose={() => setSelectedReview(null)}
          fullWidth
          maxWidth="sm"
          slotProps={{
            paper: {
              className: "text-white rounded-xl",
              sx: {
                backgroundColor: "#1e2939",
                color: "white",
                borderRadius: "0.75rem",
              },
            },
          }}
        >
          <DialogTitle className="flex justify-between items-center text-white font-semibold">
            {selectedReview?.author}
            <IconButton
              aria-label="close"
              onClick={() => setSelectedReview(null)}
              className="text-[var(--color-cgray)] hover:text-white"
            >
              <CircleX className="text-white" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <p className="text-[var(--color-cgray)] text-sm mb-2">
              {dayjs(selectedReview?.updated_at).format("DD/MM/YYYY HH:mm")}
            </p>
            <p className="text-gray-200 leading-relaxed max-h-96 overflow-y-auto pr-2 hide-scrollbar">
              {selectedReview?.content}
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Reviews;
