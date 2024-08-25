import { Schema, model, Types } from "mongoose";
import { IReaction } from "./reaction";
import { IEditHistory } from "./editHistory";
interface IComment {
    postID: Types.ObjectId;
    user: Types.ObjectId;
    text: String;
    reactions: IReaction[];
    editHistory: IEditHistory[];
}

const CommentShema = new Schema<IComment>({
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: String,
    reactions: Array<IReaction>,
    editHistory: Array<IEditHistory>,
});
const Comment = model<IComment>("Comment", CommentShema);

export { Comment, IComment };
