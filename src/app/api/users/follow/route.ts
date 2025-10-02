import User from "@/lib/models/User";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { followId } = await request.json();
    if (!followId)
      return NextResponse.json(
        { error: "followId is required" },
        { status: 400 }
      );

    if (userId === followId)
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 }
      );

    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser)
      return NextResponse.json(
        { error: "Current user not found" },
        { status: 404 }
      );

    const isFollowing = currentUser.following.includes(followId);

    let updatedCurrentUser;
    let updatedTargetUser;

    if (isFollowing) {
      updatedCurrentUser = await User.findOneAndUpdate(
        { clerkId: userId },
        { $pull: { following: followId } },
        { new: true }
      ).populate("following", "tmdbId name image_url type");

      updatedTargetUser = await User.findByIdAndUpdate(
        followId,
        { $pull: { followers: currentUser._id } },
        { new: true }
      );
    } else {
      updatedCurrentUser = await User.findOneAndUpdate(
        { clerkId: userId },
        { $addToSet: { following: followId } },
        { new: true }
      ).populate("following", "tmdbId name image_url type");

      updatedTargetUser = await User.findByIdAndUpdate(
        followId,
        { $addToSet: { followers: currentUser._id } },
        { new: true }
      );
    }

    if (!updatedTargetUser)
      return NextResponse.json(
        { error: "User to follow/unfollow not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { user: updatedCurrentUser, following: !isFollowing },
      { status: 200 }
    );
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ msg: message }, { status: 500 });
  }
}
