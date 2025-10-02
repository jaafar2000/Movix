import User from "@/lib/models/User";
import Show from "@/lib/models/Show";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const user = await User.find()
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
