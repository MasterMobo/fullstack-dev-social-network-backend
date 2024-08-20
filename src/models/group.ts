import { Schema, Types, model } from "mongoose";
import { User, IUser } from "./user";
interface IGroup {
    name: String;
    groupPicture: String;
    visibility: "public" | "private";
    members: IUser[],
    admins: IUser[],
    status: "pending" | "accepted",
}

const GroupSchema = new Schema<IGroup>({
    name: {type: String, required: true},
    groupPicture: {type: String},
    visibility:{
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    members: Array<IUser>,
    admins: Array<IUser>,
    status: {
        type: String,
        required: false,
        default: "pending",
        enum: ["pending", "accepted"],
    },
})

const Group = model<IGroup>("Group",GroupSchema);
export {IGroup,Group};