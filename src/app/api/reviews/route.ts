import { connectDB } from "@/lib/connectDB";
import Review from "@/lib/models/Review";
import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import Show from "@/lib/models/Show";
export async function GET() {
  try {
    await connectDB();
    console.log("conecting.....");
    const data = await Review.find()
      .populate("author", "clerkId username image_url", User)
      .populate("show", "name image_url type rating", Show);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ msg: message }, { status: 500 });
  }
}
