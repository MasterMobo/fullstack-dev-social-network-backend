import { Schema, model, Types } from "mongoose";
import { IReaction } from "./reaction";
import { IComment } from "./comment";
import { IEditHistory } from "./editHistory";

interface IPost {
    text: String;
    userID: Types.ObjectId;
    images: String[];
    reactions: IReaction[];
    comments: IComment[];
    visibility: "public" | "friends";
    editHistory: IEditHistory[];
    postedAt: Date;
}

const PostSchema = new Schema<IPost>({
    text: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [String], // Array of image URLs
    reactions: Array<IReaction>,
    comments: Array<IComment>,
    visibility: {
        type: String,
        enum: ["public", "friends"],
        default: "public",
    },
    editHistory: Array<IEditHistory>,
    postedAt: { type: Date, default: Date.now },
});

const Post = model<IPost>("Post", PostSchema);

export { Post, IPost };
