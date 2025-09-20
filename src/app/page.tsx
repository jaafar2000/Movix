"use client";

import Landing from "./components/Landing";
import Main from "./components/Main";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  console.log(user);

  return (
    <div>
      {user ? <Main /> : <Landing />}
    </div>
  );
}