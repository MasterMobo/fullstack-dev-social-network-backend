import { Schema, model, Types, Query, UpdateQuery } from "mongoose";
import { IReaction } from "./reaction";
import { IEditHistory } from "./editHistory";
interface IComment {
    postID: Types.ObjectId;
    user: Types.ObjectId;
    text: String;
    reactions: IReaction[];
    editHistory: IEditHistory[];
}

const CommentSchema = new Schema<IComment>({
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: String,
    reactions: Array<IReaction>,
    editHistory: Array<IEditHistory>,
});

// Remove empty reactions before saving
CommentSchema.pre("save", function (next) {
    if (this.isModified("reactions")) {
        this.reactions = this.reactions.filter(
            (reaction: IReaction) => reaction.users.length > 0
        );
    }
    next();
});

CommentSchema.pre(
    /^(updateOne|findOneAndUpdate)/,
    function (this: Query<any, any>, next) {
        const update = this.getUpdate() as UpdateQuery<IComment>;
        if (update && update.reactions) {
            update.reactions = update.reactions.filter(
                (reaction: IReaction) => reaction.users.length > 0
            );
            this.setUpdate(update);
        }
        next();
    }
);

const Comment = model<IComment>("Comment", CommentSchema);

export { Comment, IComment };
