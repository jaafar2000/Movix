import mongoose, { Schema, Document, Model, Types } from "mongoose";
import "./User";

export interface IShow extends Document {
  _id: Types.ObjectId;
  tmdbId: string;
  image_url: string;
  name: string;
  type: "movies" | "tv-shows";
  createdAt: Date;
  rating: number;
}

const ShowSchema: Schema<IShow> = new Schema(
  {
    tmdbId: { type: String, required: true, unique: true },
    image_url: { type: String, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["movies", "tv-shows"],
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Show: Model<IShow> =
  mongoose.models.Show || mongoose.model<IShow>("Show", ShowSchema);

export default Show;
