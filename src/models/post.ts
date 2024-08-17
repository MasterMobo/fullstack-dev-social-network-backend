import { Schema, model, Types } from "mongoose";
import { IReaction } from "./reaction";
import { IComment } from "./comment";
import { IEditHistory } from "./editHistory";

interface IPost {
  text: String;
  comments: IComment[];  
  userID: Types.ObjectId; 
  images: String[];  
  reactions: IReaction[];  
  visibility:"Public" | "Friends"; 
  editHistory: IEditHistory[];  
}

const PostSchema = new Schema<IPost>(
  {
    text: { type: String, required: true },
    comments: Array<IComment>, 
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },  
    images: [String],  // Array of image URLs
    reactions: Array<IReaction>, 
    visibility: { type: String, enum: ["Public", "Friends"], default: "Public" }, 
    editHistory: Array<IEditHistory>, 
  },
);

const Post = model<IPost>("Post", PostSchema);

export { Post, IPost };