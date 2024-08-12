import { Schema, model } from "mongoose";

interface IUser {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
