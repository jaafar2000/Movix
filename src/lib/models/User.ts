import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IShow } from "./Show";
export interface IUser extends Document {
  _id: Types.ObjectId;

  clerkId: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email: string;
  username: string;
  createdAt: Date;
  cover: string;
  listsToWatch: mongoose.Types.ObjectId[] | IShow[];
  watched: mongoose.Types.ObjectId[] | IShow[];
  favourite: mongoose.Types.ObjectId[] | IShow[];
  followers: mongoose.Types.ObjectId[] | IUser[];
  following: mongoose.Types.ObjectId[] | IUser[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    image_url: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    listsToWatch: [{ type: Schema.Types.ObjectId, ref: "Show" }],
    watched: [{ type: Schema.Types.ObjectId, ref: "Show" }],
    favourite: [{ type: Schema.Types.ObjectId, ref: "Show" }],
    followers : [{ type: Schema.Types.ObjectId, ref: "User" }],
    following : [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
