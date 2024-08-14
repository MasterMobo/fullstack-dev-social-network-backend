import { Schema, model } from "mongoose";

interface IUser {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
<<<<<<< HEAD
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
=======
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
>>>>>>> dev
    profilePic: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
