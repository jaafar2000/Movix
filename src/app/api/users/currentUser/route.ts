import User from "@/lib/models/User";
import Show from "@/lib/models/Show";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    await connectDB();
    const { userId } = await auth();
    console.log("userId from route", userId);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ clerkId: userId })
      .populate("listsToWatch", "tmdbId name image_url type", Show)
      .populate("watched", "tmdbId name image_url type", Show)
      .populate("favourite", "tmdbId name image_url type", Show)
      .populate("followers", "tmdbId name image_url type", User)
      .populate("following", "tmdbId name image_url type", User);

    return NextResponse.json(user, { status: 200 });
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ msg: message }, { status: 500 });
  }
}
