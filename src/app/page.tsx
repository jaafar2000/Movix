"use client";
import Landing from "./components/Landing";
import Main from "./components/Main";
import { useUser } from "@clerk/nextjs";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Nav/>
      {isSignedIn ? <Main /> : <Landing />}
      <Footer/>
    </div>
  );
}
