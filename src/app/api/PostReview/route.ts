// pages/api/PostReview.ts

import User from "@/lib/models/User";
import Review from "@/lib/models/Review";
import Show from "@/lib/models/Show";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await req.json();
    if (!res?.review || !res?.show) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let show = await Show.findOne({ tmdbId: res.show });
    if (!show) {
      show = await Show.create({
        tmdbId: res.show,
        image_url: res?.image_url,
        name: res?.name,
        type: res?.type,
      });
    }
    const review = await Review.create({
      author: user._id,
      show: show._id,
      review: res.review,
      rating: res.rating,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ msg: message }, { status: 500 });
  }
}
