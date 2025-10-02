"use client";
import React from "react";
import ShowCard from "./ShowCard";

interface Show {
  id: number;
  first_air_date?: string;
  name?: string;
  original_title?: string;
  original_language?: string;
  original_name?: string;
  overview?: string;
  vote_average?: number;
  poster_path: string;
}

interface Props {
  label?: string;
  show: Show[];
  type?: string;
  route?: string;
}

const ListSection = ({ label, show, type }: Props) => {


  return (
    <section className="w-full text-cgray mb-12">
      {label && (
        <header className="flex justify-between items-center border-b border-cgray pb-2 mb-5">
          <h2 className="font-semibold text-xl tracking-wide">{label}</h2>
        </header>
      )}

      <div className="flex overflow-x-auto gap-5 pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {show && show.length > 0 ? (
          show.map((item) => (
            <ShowCard
              key={item.id}
              id={item.id}
              name={item.name || item.original_title || item.original_name}
              poster_path={item.poster_path}
              overview={item.overview}
              vote_average={item.vote_average}
              createdAt={item.first_air_date}
              route={type}
            />
          ))
        ) : (
          <p className="text-cgray text-center w-full py-10">
            No shows to display.
          </p>
        )}
      </div>
    </section>
  );
};

export default ListSection;
