import { Schema, model } from "mongoose";
import { IUser } from "./user";
interface IEditHistory {
    updateAt: Date;
    text : String[];
};

const EditHistoryShema = new Schema<IEditHistory>(
    {
        updateAt: Date,
        text: Array<String>,
    }
);
const EditHistory = model<IEditHistory>("EditHistory",EditHistoryShema);

export {EditHistory,IEditHistory}