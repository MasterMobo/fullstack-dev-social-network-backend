import { Schema, model, Types, Query, UpdateQuery } from "mongoose";
import { IReaction } from "./reaction";
import { IEditHistory } from "./editHistory";

interface IPost {
    text: String;
    user: Types.ObjectId;
    group?: Types.ObjectId;
    images: String[];
    reactions: IReaction[];
    visibility: "public" | "friends";
    editHistory: IEditHistory[];
    postedAt: Date;
}

const PostSchema = new Schema<IPost>({
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    images: [String], // Array of image URLs
    reactions: Array<IReaction>,
    visibility: {
        type: String,
        enum: ["public", "friends"],
        default: "public",
    },
    editHistory: Array<IEditHistory>,
    postedAt: { type: Date, default: Date.now },
});

// Remove empty reactions before saving
PostSchema.pre("save", function (next) {
    if (this.isModified("reactions")) {
        this.reactions = this.reactions.filter(
            (reaction: IReaction) => reaction.users.length > 0
        );
    }
    next();
});

// Remove empty reactions before updating
PostSchema.pre(
    /^(updateOne|findOneAndUpdate)/,
    function (this: Query<any, any>, next) {
        const update = this.getUpdate() as UpdateQuery<IPost>;
        if (update && update.reactions) {
            update.reactions = update.reactions.filter(
                (reaction: IReaction) => reaction.users.length > 0
            );
            this.setUpdate(update);
        }
        next();
    }
);
const Post = model<IPost>("Post", PostSchema);

export { Post, IPost };
