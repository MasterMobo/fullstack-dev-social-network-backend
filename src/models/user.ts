import { Schema, Types, model } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
  status: "active" | "suspended";
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  // Check email using regex
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"],
  },
  password: { type: String, required: true, select: false },
  profilePic: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },
});

const User = model<IUser>("User", userSchema);
const Admin = model<IUser>("User", userSchema, "admins");

export { User, Admin, IUser };
