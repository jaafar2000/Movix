import { connectDB } from "@/lib/connectDB";
import Show from "@/lib/models/Show";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await req.json();
    let show = await Show.findOne({ tmdbId: res?.tmdbId });

    if (!show) {
      show = await Show.create({
        tmdbId: res?.tmdbId,
        image_url: res?.image_url,
        name: res?.name,
        type: res?.type,
      });
    }

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $addToSet: { favourite: show?._id },
      },
      { new: true }
    )
      .populate("listsToWatch")
      .populate("watched")
      .populate("favourite");

    return NextResponse.json(user, { status: 201 });
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ msg: message }, { status: 500 });
  }
}
