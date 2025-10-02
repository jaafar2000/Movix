"use client";

import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import ReviewCard from "../components/ReviewCard";

const Page = () => {
  const [reviews, setReviews] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/reviews");
        if (!res.ok) {
          console.log("issue fetching review response not ok");
        }

        const data = await res.json();
        setLoading(false);

        return data || [];
      } catch (err) {
        console.log("review fetching issue", err);
      }
    };
    fetchReviews().then(setReviews);
  }, []);

  return (
    <div className="w-full min-h-[90vh] overflow-y-auto p-4 sm:p-6">
      <p className="border-cgray border-b-[0.5px] pb-2 text-cgray my-4 text-center md:text-left">
        SEE WHAT PEOPLE THINK
      </p>
      {!loading ? (
        reviews.map((review, index) => (
          <div key={index}>
            <ReviewCard review={review} />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Page;
