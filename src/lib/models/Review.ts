import mongoose, { Schema, Document, Model } from "mongoose";

interface IReview extends Document {
  author: mongoose.Types.ObjectId;
  review: string;
  show: mongoose.Types.ObjectId;
  rating: number;
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    show: {
      type: Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
