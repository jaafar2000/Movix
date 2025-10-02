// src/types.ts
export interface Show {
  _id?: string;
  id?: number;
  tmdbId?: string;
  title?: string;
  image_url?: string;
  name?: string;
  type?: string;
  rating?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  createdAt?: Date;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  episode_run_time?: number[];
  original_language?: string;
  tagline?: string;
  runtime?: number;
  vote_average?: number;

  reviewsCount?: number;
}

export interface Author {
  clerkId?: string;
  image_url?: string;
  username?: string;
}

export interface Review {
  _id?: string;
  author?: Author;
  show?: Show;
  review?: string;
  createdAt?: string;
  rating: number;
}

export interface User {
  clerkId: string;
  _id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  image_url: string;
  followers?: User[];
  following?: User[];
  listsToWatch?: Show[];
  favourite?: Show[];
  watched?: Show[];
  createdAt?: string;
  isFollowing?: boolean;
}
export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  first_air_date?: string;
  release_date?: string;
  genres?: { id: number; name: string }[];
  episode_run_time?: number[];
  overview?: string;
  tagline?: string;

  vote_average?: number;
  original_language?: string;
  videos?: {
    results: { key: string; site: string; type: string }[];
  };
  runtime?: number;
  reviewsCount?: number;
}
