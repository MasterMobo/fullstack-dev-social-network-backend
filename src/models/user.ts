import { Schema, model } from "mongoose";

interface IUser {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true, select: false },
    password: { type: String, required: true, select: false },
    profilePic: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
