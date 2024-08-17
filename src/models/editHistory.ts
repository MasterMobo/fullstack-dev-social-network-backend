import { Schema, model } from "mongoose";
import { IUser } from "./user";
interface IEditHistory {
    updateAt: Date;
    text: String;
    visibility: "public" | "friends";
}

export { IEditHistory };
