"use client";

import Landing from "./components/Landing";
import Main from "./components/Main";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  console.log(user);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {user ? <Main /> : <Landing />}
    </div>
  );
}
