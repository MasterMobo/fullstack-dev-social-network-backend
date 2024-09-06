import { Schema, model } from "mongoose";
import { IUser } from "./user";
interface IEditHistory {
    updateAt: Date;
    text: String;
    visibility: "public" | "friends";
}
interface ICommentEditHistory {
    updateAt: Date;
    text: String;
}
export { IEditHistory, ICommentEditHistory };
