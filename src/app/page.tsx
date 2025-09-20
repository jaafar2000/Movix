import Landing from "./components/Landing";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Main from "./components/Main";

export default function Home() {
  return (
    <>
      <div>
        <SignedOut>
          <Landing />
        </SignedOut>
        <SignedIn>
          <Main/>
        </SignedIn>
      </div>
    </>
  );
}
