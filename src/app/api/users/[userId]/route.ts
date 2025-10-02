import User from "@/lib/models/User";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  console.log("context params:", context.params);
  try {
    await connectDB();

    const { userId } = await context.params;
    if (!userId) {
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId: userId })
      .populate("listsToWatch", "tmdbId name image_url type")
      .populate("watched", "tmdbId name image_url type")
      .populate("favourite", "tmdbId name image_url type")
      .populate("followers", "username first_name last_name image_url")
      .populate("following", "username first_name last_name image_url");

    return NextResponse.json(user, { status: 200 });
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ msg: message }, { status: 500 });
  }
}
