import { Schema, Types, model } from "mongoose";
import { User, IUser } from "./user";
interface IGroup {
    text: String;
    groupPicture: String;
    visibility: "public" | "private";
    members: IUser[],
    admins: IUser[]
}

const GroupSchema = new Schema<IGroup>({
    text: {type: String, required: true},
    groupPicture: {type: String},
    visibility:{
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    members: Array<IUser>,
    admins: Array<IUser>,
})

const Group = model<IGroup>("Group",GroupSchema);
export {IGroup,Group};